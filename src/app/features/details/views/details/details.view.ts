import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICityDailyWeather, ICityWeather } from 'src/app/core/models/CityWeather.model';
import { WeatherService } from 'src/app/core/services/weather.service';
import { loadCurrentWeatherSuccess } from 'src/app/features/home/state/home.actions';

import { IAppState } from 'src/app/shared/state/app.reducer';
import { loadWeatherDetails } from '../../state/details.actions';
import { selectDetailsEntity, selectDetailsError, selectDetailsLoading } from '../../state/details.selectors';

@Component({
  selector: 'app-details',
  templateUrl: './details.view.html',
  styleUrls: ['./details.view.scss']
})
export class DetailsView implements OnInit {
  details$!: Observable<ICityDailyWeather | undefined>;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadWeatherDetails());

    this.details$ = this.store.pipe(select(selectDetailsEntity));
    this.loading$ = this.store.pipe(select(selectDetailsLoading));
    this.error$ = this.store.pipe(select(selectDetailsError));
  }

}
