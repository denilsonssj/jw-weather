import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayout } from 'src/app/core/layouts/dashboard/dashboard.layout';
import { HomeView } from './views/home/home.view';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      { path: '', component: HomeView }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
