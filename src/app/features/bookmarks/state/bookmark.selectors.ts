import { createFeatureSelector, createSelector } from '@ngrx/store';

import { bookmarkKey, IBookmarksState } from './bookmarks.reducer';

export const selectBookmarkState = createFeatureSelector<IBookmarksState>(bookmarkKey);

export const selectBookmarksList = createSelector(
  selectBookmarkState,
  (bookmarksState: IBookmarksState) => bookmarksState.bookmarks
);

