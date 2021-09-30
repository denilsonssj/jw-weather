import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayout } from 'src/app/core/layouts/dashboard/dashboard.layout';
import { DetailsView } from './details/details.view';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      { path: '', component: DetailsView }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
