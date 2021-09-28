import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import { ICityWeather } from 'src/app/core/models/CityWeather.model';
import { loadCurrentWeather } from '../../state/home.actions';
import {
  selectCurrentWeather,
  selectCurrentWeatherError,
  selectCurrentWeatherLoading
} from '../../state/home.selectors';
import { IBookmark } from 'src/app/core/models/Bookmark.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss']
})
export class HomeView implements OnInit, OnDestroy {
  searchControl: FormControl;
  searchLabelControl: FormControl;
  searchWithAutoCompleteControl: FormControl;
  cityWeather!: ICityWeather;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  private componentDestroyed = new Subject();

  constructor(private store: Store) {
    this.searchControl = new FormControl('', [Validators.required]);
    this.searchWithAutoCompleteControl = new FormControl('', [Validators.required]);
    this.searchLabelControl = new FormControl('always');
    this.store.pipe(select(
      selectCurrentWeather),
      takeUntil(this.componentDestroyed),
      ).subscribe(value => this.cityWeather = value);
    this.loading$ = this.store.pipe(select(selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(selectCurrentWeatherError));
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
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
  }

}
