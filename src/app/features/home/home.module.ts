import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeView } from './views/home/home.view';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeView
  ],
  imports: [
    CommonModule,

    AppMaterialModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
