import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesAutocompleteComponent } from './cities-autocomplete.component';

describe('CitiesAutocompleteComponent', () => {
  let component: CitiesAutocompleteComponent;
  let fixture: ComponentFixture<CitiesAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitiesAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
