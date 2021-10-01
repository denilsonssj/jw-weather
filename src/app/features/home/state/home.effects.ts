import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";

import { 
  loadCurrentWeather,
  loadCurrentWeatherFailed,
  loadCurrentWeatherSuccess 
} from './home.actions';
import { WeatherService } from "src/app/core/services/weather.service";

@Injectable()
export class HomeEffects {
  loadCurrentWeather$ = createEffect(() => this.actions$
    .pipe(
      ofType(loadCurrentWeather),
      mergeMap(({ query }) =>
        this.weatherService.getCityWeatherByQuery(query)),
      catchError((error, caught$) => {
        this.store.dispatch(loadCurrentWeatherFailed());
        return caught$;
      }),
      map((entity: any) => loadCurrentWeatherSuccess({ entity })),
    )
  );

  constructor (
    private actions$: Actions,
    private store: Store,
    private weatherService: WeatherService,
  ) {}
}