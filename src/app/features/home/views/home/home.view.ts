import { 
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit 
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ComponentPortal, DomPortalOutlet, PortalOutlet } from '@angular/cdk/portal';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ICityWeather, ICoord } from 'src/app/core/models/CityWeather.model';
import { IBookmark } from 'src/app/core/models/Bookmark.model';
import { 
  clearHomeState,
  loadCurrentWeather,
  loadCurrentWeatherById,
  toggleBookmark 
} from '../../state/home.actions';
import {
  selectCurrentWeather,
  selectCurrentWeatherError,
  selectCurrentWeatherLoading
} from '../../state/home.selectors';
import { 
  selectBookmarksList
} from 'src/app/features/bookmarks/state/bookmark.selectors';
import { ICityTypeaheadItem } from 'src/app/core/models/CityTypeaheadItem.model';
import { UnitSelectorComponent } from '../../components/unit-selector/unit-selector.component';
import { Unit } from 'src/app/core/models/Unit.enum';
import { selectUnitConfig } from 'src/app/shared/state/config/config.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss']
})
export class HomeView implements OnInit, OnDestroy {
  searchControl!: FormControl;
  searchLabelControl!: FormControl;
  searchControlWithAutoComplete!: FormControl;

  private componentDestroyed = new Subject();
  cityWeather$!: Observable<ICityWeather>;
  cityWeather!: ICityWeather;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;
  isCurrentFavorite$!: Observable<boolean>;
  bookmarksList$!: Observable<IBookmark[]>;
  unit$!: Observable<Unit>;
  private portalOutlet!: PortalOutlet;

  constructor(
    private store: Store,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  ngOnInit(): void {
    this.searchControl = new FormControl('', [Validators.required]);
    this.searchLabelControl = new FormControl('always');
    this.searchControlWithAutoComplete = new FormControl(undefined);

    this.searchControlWithAutoComplete.valueChanges
      .pipe(
        takeUntil(this.componentDestroyed))
      .subscribe((value: ICityTypeaheadItem) => {
        if (!!value) {
          this.store.dispatch(loadCurrentWeatherById({ 
            id: value.geonameid.toString() 
          }));
        }
      });

    this.cityWeather$ = this.store.pipe(select(selectCurrentWeather));
    this.cityWeather$.pipe(takeUntil(this.componentDestroyed))
      .subscribe(cityWeather => this.cityWeather = cityWeather);
    this.loading$ = this.store.pipe(select(selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(selectCurrentWeatherError));
    this.bookmarksList$ = this.store.pipe(select(selectBookmarksList));
    this.isCurrentFavorite$ = combineLatest([this.cityWeather$, this.bookmarksList$])
      .pipe(
        map(([current, bookmarksList]) => {
          if (!!current) {
            return bookmarksList.some(bookmark => bookmark.id === current.city.id);
          }
          return false;
        }),
    );
    this.setupPortal();
    this.unit$ = this.store.pipe(select(selectUnitConfig));
  }
  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
    this.store.dispatch(clearHomeState());
    this.portalOutlet.detach();
  }

  getErrorMessage() {
    if (this.searchControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.searchControl.hasError('required') ? 'Not a valid search' : '';
  }

  doSearch() {
    const query = this.searchControl.value;
    this.store.dispatch(loadCurrentWeather({ query }));
  }

  onToggleBookmark() {
    const { id , name, country, coord } = this.cityWeather.city;
    const bookmark: IBookmark = {
      id: id as number,
      name: name as string,
      country: country as string,
      coord: coord as ICoord,
    };
    this.store.dispatch(toggleBookmark({ entity: bookmark }));
  }

  private setupPortal() {
    const el = document.querySelector('#navbar-portal-outlet');
    if (el instanceof Element) {
      this.portalOutlet = new DomPortalOutlet(
        el,
        this.componentFactoryResolver,
        this.appRef,
        this.injector
      );
      this.portalOutlet.attach(new ComponentPortal(UnitSelectorComponent));
    }
  }
}
