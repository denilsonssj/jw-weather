import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { BookmarksView } from './views/bookmarks/bookmarks.view';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { bookmarkReducer } from './state/bookmarks.reducer';

@NgModule({
  declarations: [
    BookmarksView
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('bookmark', bookmarkReducer),

    AppMaterialModule,
    SharedModule,
    BookmarksRoutingModule
  ]
})
export class BookmarksModule { }
