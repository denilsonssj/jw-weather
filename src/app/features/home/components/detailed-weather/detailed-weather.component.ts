import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IWeather, IWind } from 'src/app/core/models/CityWeather.model';
import { Unit } from 'src/app/core/models/Unit.enum';
import { unitToSymbol } from 'src/app/core/utils/unit.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedWeatherComponent {
  @Input() weather!: IWeather;

  @Input()
  unit!: Unit;

  get weatherIcon(): string {
    return `${environment.openWeatherMapUrl}/img/wn/${this.weather.icon}@2x.png`;
  }

  getSymbol(unit: Unit): string {
    return unitToSymbol(unit);
  }
}
