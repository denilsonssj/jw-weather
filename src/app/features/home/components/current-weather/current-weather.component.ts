import { 
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { ICityWeather, ICoord } from 'src/app/core/models/CityWeather.model';
import { Unit } from 'src/app/core/models/Unit.enum';

@Component({
  selector: 'current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent implements OnInit {
  @Input()
  cityWeather!: ICityWeather;

  @Input()
  isFavorite!: boolean;

  @Input()
  unit!: Unit;

  coord!: ICoord;

  @Output('onToggleBookmark')
  toggleBookmark = new EventEmitter();

  ngOnInit() {
    this.coord = this.cityWeather.city.coord as ICoord;
  }

  get cityName(): string {
    return `${this.cityWeather.city.name}, ${this.cityWeather.city.country}`;
  }

  get enumTypes(): typeof Unit {
    return Unit;
  }

  onToggleBookmark() {
    this.toggleBookmark.emit();
  }
}
