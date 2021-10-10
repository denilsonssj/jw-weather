import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookmarksView } from './views/bookmarks/bookmarks.view';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { bookmarkKey, bookmarkReducer } from './state/bookmarks.reducer';
import { BookmarksEffects } from './state/bookmarks.effects';

@NgModule({
  declarations: [
    BookmarksView
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(bookmarkKey, bookmarkReducer),
    EffectsModule.forFeature([BookmarksEffects]),

    AppMaterialModule,
    SharedModule,
    BookmarksRoutingModule
  ],
})
export class BookmarksModule { }
