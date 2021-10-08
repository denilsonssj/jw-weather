import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './app-material/app-material.module';
import { CitiesAutocompleteComponent } from './components/cities-autocomplete/cities-autocomplete.component';

@NgModule({
  declarations: [
    CitiesAutocompleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    AppMaterialModule
  ],
  exports: [
    CitiesAutocompleteComponent
  ]
})
export class SharedModule { }
