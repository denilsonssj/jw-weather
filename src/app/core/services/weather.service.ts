import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ICityWeather } from '../models/CityWeather.model';
import { responseToCityWheather } from '../utils/response.util';

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

  private doGet<T>(url: string, params: HttpParams): Observable<T> {
    params = params.append('appid', this.apiKey);
    params = params.append('lang', 'pt_br');
    return this.http.get<T>(`${environment.apiUrl}/${ url }`, { params });
  }
}
