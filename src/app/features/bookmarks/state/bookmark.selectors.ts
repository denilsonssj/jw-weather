import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBookmark } from 'src/app/core/models/Bookmark.model';

import { IBookmarksState } from './bookmarks.reducer';

export const bookmarkKey: string = 'bookmark';

export const selectBookmarkState = createFeatureSelector<IBookmarksState>(bookmarkKey);

export const selectBookmarksList = createSelector(
  selectBookmarkState,
  (bookmarksState: IBookmarksState) => bookmarksState.bookmarks
);

