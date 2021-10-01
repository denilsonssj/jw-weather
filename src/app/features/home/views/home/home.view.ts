import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, combineLatest, pipe } from 'rxjs';
import { combineAll, isEmpty, map, takeUntil } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import { ICityWeather } from 'src/app/core/models/CityWeather.model';
import { IBookmark } from 'src/app/core/models/Bookmark.model';
import { clearHomeState, loadCurrentWeather, toggleBookmark } from '../../state/home.actions';
import {
  selectCurrentWeather,
  selectCurrentWeatherError,
  selectCurrentWeatherLoading
} from '../../state/home.selectors';
import { selectBookmarksList } from 'src/app/features/bookmarks/state/bookmark.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss']
})
export class HomeView implements OnInit, OnDestroy {
  searchControl!: FormControl;
  searchLabelControl!: FormControl;
  searchWithAutoCompleteControl!: FormControl;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  private componentDestroyed = new Subject();
  cityWeather$!: Observable<ICityWeather>;
  cityWeather!: ICityWeather;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;
  isCurrentFavorite$!: Observable<boolean>;
  bookmarksList!: IBookmark[];
  bookmarksList$!: Observable<IBookmark[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchControl = new FormControl('', [Validators.required]);
    this.searchWithAutoCompleteControl = new FormControl('', [Validators.required]);
    this.searchLabelControl = new FormControl('always');

    this.cityWeather$ = this.store.pipe(select(selectCurrentWeather));
    this.cityWeather$.pipe(takeUntil(this.componentDestroyed))
      .subscribe(cityWeather => this.cityWeather = cityWeather);
    this.loading$ = this.store.pipe(select(selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(selectCurrentWeatherError));
    this.bookmarksList$ = this.store.pipe(select(selectBookmarksList));
    this.isCurrentFavorite$ = combineLatest([this.cityWeather$, this.bookmarksList$])
      .pipe(
        map(([current, bookmarksList]) => {
          if (!!current) {
            return bookmarksList.some(bookmark => bookmark.id === current.city.id);
          }
          return false;
        }),
    );
  }
  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
    this.store.dispatch(clearHomeState());
  } doAnything() {
    this.bookmarksList$.pipe(takeUntil(this.componentDestroyed))
      .subscribe(bookmarksList => this.bookmarksList = bookmarksList);
  }

  getErrorMessage() {
    if (this.searchControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.searchControl.hasError('required') ? 'Not a valid search' : '';
  }

  doSearch() {
    const query = this.searchControl.value;
    this.store.dispatch(loadCurrentWeather({ query }));
  }

  onToggleBookmark() {
    const { id, name, country, coord } = this.cityWeather.city;
    const bookmark: IBookmark = {
      id,
      name,
      country,
      coord
    };
    this.store.dispatch(toggleBookmark({ entity: bookmark }));
  }
}
