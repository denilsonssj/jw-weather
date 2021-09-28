import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { MainLayout } from './layouts/main/main.layout';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { DashboardLayout } from './layouts/dashboard/dashboard.layout';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    MainLayout,
    DashboardLayout,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    AppMaterialModule,
    SharedModule,
    FormsModule,
  ]
})
export class CoreModule { }
