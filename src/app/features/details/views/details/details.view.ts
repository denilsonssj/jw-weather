import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICityDailyWeather, ICityWeather } from 'src/app/core/models/CityWeather.model';
import { Unit } from 'src/app/core/models/Unit.enum';

import { IAppState } from 'src/app/shared/state/app.reducer';
import { selectUnitConfig } from 'src/app/shared/state/config/config.selectors';
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
  unit$!: Observable<Unit>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadWeatherDetails());
    this.details$ = this.store.pipe(select(selectDetailsEntity));
    this.loading$ = this.store.pipe(select(selectDetailsLoading));
    this.error$ = this.store.pipe(select(selectDetailsError));
    this.unit$ = this.store.pipe(select(selectUnitConfig));
  }

}
