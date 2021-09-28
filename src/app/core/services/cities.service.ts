import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jsSearch from 'js-search';

import { ICityWeather } from '../models/CityWeather.model';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) {
  }

  getCities(query: string): Observable<ICityWeather[]> {
    return this.http.get<ICityWeather[]>('assets/database/cities.json').pipe(
      map(cities => {
        const search = new jsSearch.Search('geonameid');
        search.addIndex('country');
        search.addIndex('name');
        search.addDocuments(cities);
        return search.search(query) as ICityWeather[];
      }),
    );
      
  }
}