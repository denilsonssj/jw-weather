import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksView } from './bookmarks.view';

describe('BookmarksView', () => {
  let component: BookmarksView;
  let fixture: ComponentFixture<BookmarksView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarksView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
