import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayout } from 'src/app/core/layouts/dashboard/dashboard.layout';
import { BookmarksView } from './views/bookmarks/bookmarks.view';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      { path: '', component: BookmarksView }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookmarksRoutingModule { }
