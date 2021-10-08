import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICityTypeaheadItem } from '../models/CityTypeaheadItem.model';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) {}

  getCities(query: string): Observable<ICityTypeaheadItem[]> {
    return this.http.get<ICityTypeaheadItem[]>('app/assets/database/cities.json').pipe(
      map((cities: ICityTypeaheadItem[]) =>
        cities.filter(city => city.name.toLocaleLowerCase().startsWith(query.toLocaleLowerCase()))
          .sort((a, b) => a.name.localeCompare(b.name))),
    );
  }
}