import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IAppState } from 'src/app/shared/state/app.reducer';
import { selectUnitConfig } from 'src/app/shared/state/config/config.selectors';

import { environment } from 'src/environments/environment';
import { ICityDailyWeather, ICityWeather } from '../models/CityWeather.model';
import { Unit } from '../models/Unit.enum';
import { 
  responseToCityWheather,
  responseToCityDailyWeather 
} from '../utils/response.util';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnDestroy {

  apiKey: string = environment.openWeatherApiKey as string || '';
  unit!: Unit;
  private serviceDestroyed$ = new Subject();

  constructor(private http: HttpClient, private store: Store<IAppState>) {
    this.store.pipe(
      select(selectUnitConfig),
      takeUntil(this.serviceDestroyed$)
    ).subscribe((unit: Unit) => this.unit = unit);
  }

  ngOnDestroy() {
    this.serviceDestroyed$.next();
    this.serviceDestroyed$.unsubscribe();
  }

  getCityWeatherByQuery(query: string): Observable<ICityWeather> {
    const params = new HttpParams({ fromObject: { q: query }});
    return this.doGet('weather', params).pipe(
      map(response => responseToCityWheather(response))
    );
  }

  getCityWeatherByCoordinate(lat: number, lon: number): Observable<ICityWeather> {
    const params = new HttpParams({ fromObject: {
      lat: lat.toString(),
      lon: lon.toString(),
    }});
    return this.doGet<any>('weather', params)
      .pipe(map(response => responseToCityWheather(response)));
  }

  getCityWeatherById(id: string): Observable<ICityWeather> {
    const params = new HttpParams({ fromObject: { id } });
    return this.doGet<any>('weather', params).pipe(
      map(response => responseToCityWheather(response))
    );
  }

  getWeatherDetails(lat: number, lon: number): Observable<ICityDailyWeather> {
    const params = new HttpParams({
      fromObject: {
        lat: lat.toString(),
        lon: lon.toString(),
        exclude: 'minutely,hourly'
      }
    });
    return this.doGet<any>('onecall', params)
      .pipe(map(response => responseToCityDailyWeather(response)));
  }

  private doGet<T>(url: string, params: HttpParams): Observable<T> {
    params = params.append('appid', this.apiKey);
    params = params.append('lang', 'pt_br');
    if (this.unit != Unit.SI) {
      params = params.append('units', this.unit.toLocaleLowerCase());
    }
    return this.http.get<T>(`${environment.apiUrl}/${ url }`, { params });
  }
}
