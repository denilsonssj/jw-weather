import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsView } from './details/details.view';

@NgModule({
  declarations: [
    DetailsView
  ],
  imports: [
    CommonModule,

    AppMaterialModule,
    SharedModule,
    DetailsRoutingModule
  ]
})
export class DetailsModule { }
