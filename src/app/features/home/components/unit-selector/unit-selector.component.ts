import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Unit } from 'src/app/core/models/Unit.enum';
import { IAppState } from 'src/app/shared/state/app.reducer';
import { updateUnit } from 'src/app/shared/state/config/config.actions';
import { selectUnitConfig } from 'src/app/shared/state/config/config.selectors';

@Component({
  templateUrl: './unit-selector.component.html',
  styleUrls: ['./unit-selector.component.scss']
})
export class UnitSelectorComponent implements OnInit {
  
  unit$!: Observable<Unit>;
  unit!: Unit;
  unitEnum: typeof Unit = Unit;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.unit$ = this.store.pipe(select(selectUnitConfig));
    this.unit$.subscribe(unit => this.unit = unit);
  }

  updateUnit(unit: Unit) {
    this.store.dispatch(updateUnit({ unit }));
  }

  isActiveToggle(unitLabel: string): boolean {
    return unitLabel === this.unit;
  }

}
