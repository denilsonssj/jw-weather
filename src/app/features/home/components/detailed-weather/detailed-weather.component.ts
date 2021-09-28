import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IWeather } from 'src/app/core/models/CityWeather.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedWeatherComponent {
  @Input() weather!: IWeather;

  get weatherIcon(): string {
    return `${environment.openWeatherMapUrl}/img/wn/${this.weather.icon}@2x.png`;
  }
}
