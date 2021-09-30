import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'bookmarks',
    loadChildren: () => import('./features/bookmarks/bookmarks.module').then(m => m.BookmarksModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./features/details/details.module').then(m => m.DetailsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
