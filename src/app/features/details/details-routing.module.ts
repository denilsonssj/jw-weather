import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayout } from 'src/app/core/layouts/dashboard/dashboard.layout';
import { DetailsView } from './views/details/details.view';
import { DetailsGuardService } from './services/details.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: '',
        component: DetailsView,
        canActivate: [DetailsGuardService]
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
