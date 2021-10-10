import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { of } from "rxjs";
import { mergeMap, withLatestFrom, map } from "rxjs/operators";


import { IBookmark } from "src/app/core/models/Bookmark.model";
import { ICityWeather, ICoord } from "src/app/core/models/CityWeather.model";
import { WeatherService } from "src/app/core/services/weather.service";
import { IAppState } from "src/app/shared/state/app.reducer";
import { selectBookmarksList } from "./bookmark.selectors";
import { toggleBookmarkById, updateBookmarksList } from "./bookmarks.actions";

@Injectable()
export class BookmarksEffects {

  toggleBookmarksById$ = createEffect(() => this.actions$.pipe(
    ofType(toggleBookmarkById),
    withLatestFrom(this.store.pipe(select(selectBookmarksList))),
    mergeMap(([{ id }, bookmarks]: [{ id: number }, IBookmark[]]) => {
      if (bookmarks.some(bookmark => bookmark.id === id)) {
        return of(bookmarks.filter(bookmark => bookmark.id !== id));
      }
      return this.weatherService.getCityWeatherById(id.toString())
        .pipe(map((cityWeather: ICityWeather) => {
          const bookmark = {
            id: cityWeather.city.id as number,
            coord: cityWeather.city.coord as ICoord,
            name: cityWeather.city.name as string,
            country: cityWeather.city.country as string,
          };
          return [...bookmarks, bookmark];
        }));
    }),
    map((bookmarks: IBookmark[]) => updateBookmarksList({ bookmarks })),
  ));

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private weatherService: WeatherService
  ) {}
}