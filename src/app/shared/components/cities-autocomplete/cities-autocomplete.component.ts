import { Component, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';

import { CitiesService } from 'src/app/core/services/cities.service';
import { 
  ICityTypeaheadItem 
} from 'src/app/core/models/CityTypeaheadItem.model';

@Component({
  selector: 'shared-cities-autocomplete',
  templateUrl: './cities-autocomplete.component.html',
  styleUrls: ['./cities-autocomplete.component.scss'],
})
export class CitiesAutocompleteComponent implements OnInit, ControlValueAccessor {

  @ViewChild(RouterOutlet) outlet!: RouterOutlet;
  dataSource!: ICityTypeaheadItem[];
  searchWithAutoComplete!: FormControl;
  search!: string;
  loading!: boolean;
  disabled!: boolean;

  private onChange!: (value: ICityTypeaheadItem) => void;
  private onTouched!: () => void;

  constructor(
    private router: Router,
    private citiesService: CitiesService,
    @Optional() @Self() public control: NgControl
  ) {
    control.valueAccessor = this;
  }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "*")
        this.outlet.deactivate();
    });

  this.searchWithAutoComplete = new FormControl('');
  this.searchWithAutoComplete.valueChanges
    .pipe(debounceTime(500), switchMap(query =>
      (!!query && typeof query === 'string')
        ? this.citiesService.getCities(query) : []
    ))
    .subscribe(dataSource => this.dataSource = dataSource);
  }

  onSelected(selectedCity: ICityTypeaheadItem) {
    this.onTouched();
    this.onChange(selectedCity);
  }

  registerOnChange(fn: (value: ICityTypeaheadItem) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue() {}

  displayCityName(selectedCity: ICityTypeaheadItem): string {
    return (!!selectedCity && !!selectedCity.name)
      ? `${selectedCity.name}, ${selectedCity.country}` :  '';
  }

}
