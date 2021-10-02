import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ICityDailyWeather, ICityWeather } from '../models/CityWeather.model';
import { responseToCityWheather, responseToCityDailyWeather } from '../utils/response.util';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey: string = environment.openWeatherApiKey as string || '';
  constructor(private http: HttpClient) { }

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
    return this.http.get<T>(`${environment.apiUrl}/${ url }`, { params });
  }
}
