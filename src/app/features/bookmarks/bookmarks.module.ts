import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookmarksView } from './views/bookmarks/bookmarks.view';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookmarksRoutingModule } from './bookmarks-routing.module';

@NgModule({
  declarations: [
    BookmarksView
  ],
  imports: [
    CommonModule,

    AppMaterialModule,
    SharedModule,
    BookmarksRoutingModule
  ]
})
export class BookmarksModule { }
