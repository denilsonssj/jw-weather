import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICityDailyWeather, ICityWeather } from 'src/app/core/models/CityWeather.model';
import { WeatherService } from 'src/app/core/services/weather.service';

import { IAppState } from 'src/app/shared/state/app.reducer';
import { loadWeatherDetails } from '../../state/details.actions';

@Component({
  selector: 'app-details',
  templateUrl: './details.view.html',
  styleUrls: ['./details.view.scss']
})
export class DetailsView implements OnInit {
  cityWeather!: ICityWeather;
  cityDailyWeather!: ICityDailyWeather;

  constructor(private store: Store<IAppState>, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.store.dispatch(loadWeatherDetails());
    this.weatherService.getCityWeatherByCoordinate(32.77, -96.78).subscribe(cityWeather => this.cityWeather = cityWeather);
    this.weatherService.getWeatherDetails(32.77, -96.78).subscribe(cityDailyWeather => this.cityDailyWeather = cityDailyWeather);
    
  }

}
