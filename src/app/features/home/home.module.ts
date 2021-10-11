import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeEffects } from './state/home.effects';
import { HomeView } from './views/home/home.view';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { DetailedWeatherComponent } from './components/detailed-weather/detailed-weather.component';
import { StoreModule } from '@ngrx/store';
import { homeKeyReducer, homeReducer } from './state/home.reducer';
import { BookmarksModule } from '../bookmarks/bookmarks.module';
import { UnitSelectorComponent } from './components/unit-selector/unit-selector.component';

@NgModule({
  declarations: [
    HomeView,
    CurrentWeatherComponent,
    DetailedWeatherComponent,
    UnitSelectorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([HomeEffects]),
    StoreModule.forFeature(homeKeyReducer, homeReducer),

    AppMaterialModule,
    SharedModule,
    HomeRoutingModule,
    BookmarksModule,
  ],
  exports: [
    DetailedWeatherComponent
  ]
})
export class HomeModule { }
