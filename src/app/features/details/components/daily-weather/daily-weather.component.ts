import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { format, fromUnixTime } from 'date-fns';

import { IDailyWeather } from 'src/app/core/models/CityWeather.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'details-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyWeatherComponent implements OnInit {

  @Input()
  dailyWeather!: IDailyWeather;

  @Input()
  timeZone!: string | undefined;

  urlMapWeather: string = environment.openWeatherMapUrl;

  constructor() { }

  ngOnInit(): void {
  }

  get date(): string {
    return format(fromUnixTime(this.dailyWeather.date), 'dd MMM - EEEE');
  }

  unixTohourMinute(value: number): string {
    return format(fromUnixTime(value), 'HH:mm');
  }

  get icon(): string {
    return `${this.urlMapWeather}/img/wn/${this.dailyWeather.weather.icon}@2x.png`;
  }
}
