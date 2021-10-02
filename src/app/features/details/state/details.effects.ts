import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import { loadWeatherDetails, loadWeatherDetailsFailed, loadWeatherDetailsSuccess } from './details.actions';
import { selectRouterQueryParams } from 'src/app/shared/state/router/router.selectors';
import { IAppState } from 'src/app/shared/state/app.reducer';
import { WeatherService } from 'src/app/core/services/weather.service';

@Injectable()
export class DetailsEffects {

  loadCurrentWeather$ = createEffect(() => this.actions$
    .pipe(
      ofType(loadWeatherDetails),
      withLatestFrom(this.store.pipe(select(selectRouterQueryParams))),
      mergeMap(([, queryParams]: [any, Params]) =>
        combineLatest([
          this.weatherService.getCityWeatherByCoordinate(queryParams.lat, queryParams.lon),
          this.weatherService.getWeatherDetails(queryParams.lat, queryParams.lon),
        ])
      ),
      catchError((err, caught$) => {
        this.store.dispatch(loadWeatherDetailsFailed());
        return caught$;
      }),
      map(([current, daily]) => {
        const entity = daily;
        entity.city = {...current.city, timeZone: daily.city.timeZone};
        return loadWeatherDetailsSuccess({ entity });
      }),
    )
  );

  constructor(private actions$: Actions,
              private store: Store<IAppState>,
              private weatherService: WeatherService) {
  }
}