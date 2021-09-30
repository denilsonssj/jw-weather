import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IBookmarksState } from './bookmarks.reducer';

export const bookmarkKey = 'bookmark';

export const selectBookmarksState = createFeatureSelector<IBookmarksState>(bookmarkKey);

export const selectBookmarksList = createSelector(
  selectBookmarksState,
  (bookmarksState: IBookmarksState) => bookmarksState.list,
);