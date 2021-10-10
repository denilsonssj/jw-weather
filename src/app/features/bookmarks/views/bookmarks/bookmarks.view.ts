import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { IBookmark } from 'src/app/core/models/Bookmark.model';
import { selectBookmarksList } from '../../state/bookmark.selectors';
import { IBookmarksState } from '../../state/bookmarks.reducer';
import { 
  removeBookmark as removeBookmarkAction,
  toggleBookmarkById 
} from '../../state/bookmarks.actions';
import { 
  ICityTypeaheadItem
} from 'src/app/core/models/CityTypeaheadItem.model';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.view.html',
  styleUrls: ['./bookmarks.view.scss']
})
export class BookmarksView implements OnInit, OnDestroy {
  bookmarks$!: Observable<IBookmark[]>;
  private componentDestroyed = new Subject();
  searchControlWithAutoComplete!: FormControl;

  constructor(private store: Store<IBookmarksState>) {}

  ngOnInit() {
    this.searchControlWithAutoComplete = new FormControl('');

    this.bookmarks$ = this.store.pipe(select(selectBookmarksList));
    this.searchControlWithAutoComplete.valueChanges
      .pipe(
        takeUntil(this.componentDestroyed),
        catchError((error, caught$) => {
          console.log(error);
          return caught$;
        }))
      .subscribe((value: ICityTypeaheadItem) =>
        this.store.dispatch(toggleBookmarkById({ id: value.geonameid }))
      );
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  removeBookmark(id: number) {
    this.store.dispatch(removeBookmarkAction({ id }));
  }
}
