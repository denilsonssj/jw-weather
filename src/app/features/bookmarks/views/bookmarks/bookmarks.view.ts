import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { IBookmark } from 'src/app/core/models/Bookmark.model';
import { selectBookmarksList } from '../../state/bookmark.selectors';
import { IBookmarksState } from '../../state/bookmarks.reducer';
import { removeBookmark as removeBookmarkAction } from '../../state/bookmarks.actions';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.view.html',
  styleUrls: ['./bookmarks.view.scss']
})
export class BookmarksView implements OnInit, OnDestroy {
  bookmarks: IBookmark[] = [];
  private componentDestroyed = new Subject();

  constructor(private store: Store<IBookmarksState>) {
    this.store.pipe(select(
      selectBookmarksList),
      takeUntil(this.componentDestroyed)
      ).subscribe(value => this.bookmarks = value);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  removeBookmark(id: number) {
    this.store.dispatch(removeBookmarkAction({ id }));
  }
}
