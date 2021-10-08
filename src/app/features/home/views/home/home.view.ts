import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ICity, ICityWeather, ICoord } from 'src/app/core/models/CityWeather.model';
import { IBookmark } from 'src/app/core/models/Bookmark.model';
import { 
  clearHomeState,
  loadCurrentWeather,
  loadCurrentWeatherById,
  toggleBookmark 
} from '../../state/home.actions';
import {
  selectCurrentWeather,
  selectCurrentWeatherError,
  selectCurrentWeatherLoading
} from '../../state/home.selectors';
import { 
  selectBookmarksList
} from 'src/app/features/bookmarks/state/bookmark.selectors';
import { ICityTypeaheadItem } from 'src/app/core/models/CityTypeaheadItem.model';
import { CitiesService } from 'src/app/core/services/cities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss']
})
export class HomeView implements OnInit, OnDestroy {
  searchControl!: FormControl;
  searchLabelControl!: FormControl;
  searchControlWithAutoComplete!: FormControl;

  private componentDestroyed = new Subject();
  cityWeather$!: Observable<ICityWeather>;
  cityWeather!: ICityWeather;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;
  isCurrentFavorite$!: Observable<boolean>;
  bookmarksList$!: Observable<IBookmark[]>;

  selectedCities$: ICity[] = [];

  constructor(private store: Store, private citiesService: CitiesService) {}

  ngOnInit(): void {
    this.searchControl = new FormControl('', [Validators.required]);
    this.searchLabelControl = new FormControl('always');
    this.searchControlWithAutoComplete = new FormControl(undefined);

    this.searchControlWithAutoComplete.valueChanges
      .pipe(
        takeUntil(this.componentDestroyed))
      .subscribe((value: ICityTypeaheadItem) => {
        console.log(`[Home] value ${value}`);
        if (!!value) {
          this.store.dispatch(loadCurrentWeatherById({ 
            id: value.geonameid.toString() 
          }));
        }
      });

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
    const { id , name, country, coord } = this.cityWeather.city;
    const bookmark: IBookmark = {
      id: id as number,
      name: name as string,
      country: country as string,
      coord: coord as ICoord,
    };
    this.store.dispatch(toggleBookmark({ entity: bookmark }));
  }

  displayWith(city: ICity): string {
    return city.name as string;
  }
}
