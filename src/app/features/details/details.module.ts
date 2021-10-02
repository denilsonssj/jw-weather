import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsView } from './views/details/details.view';
import { DetailsGuardService } from './services/details.service';
import { detailsKeyName, detailsReducer } from './state/details.reducer';
import { DetailsEffects } from './state/details.effects';

@NgModule({
  declarations: [
    DetailsView
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(detailsKeyName, detailsReducer),
    EffectsModule.forFeature([DetailsEffects]),

    AppMaterialModule,
    SharedModule,
    DetailsRoutingModule
  ],
  providers: [
    DetailsGuardService
  ]
})
export class DetailsModule { }
