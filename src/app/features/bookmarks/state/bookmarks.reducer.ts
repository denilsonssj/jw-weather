import { createReducer, Action, on } from "@ngrx/store";

import { IBookmark } from "src/app/core/models/Bookmark.model";
import { removeBookmark, resetBookmarkState } from "./bookmarks.actions";
import { toggleBookmark as toggleBookmarkAction } from "../../home/state/home.actions";

export interface IBookmarksState {
  bookmarks: IBookmark[];
}

export const bookmarkInitialState: IBookmarksState = {
  bookmarks: [],
};

export const bookmarkKey: string = 'bookmark';

const reducer = createReducer(
  bookmarkInitialState,
  on(resetBookmarkState, () => bookmarkInitialState),
  on(toggleBookmarkAction, (state, { entity }) => ({
    ...state,
    bookmarks: toggleBookMark(state.bookmarks, entity),
  })),
  on(removeBookmark, (state, { id }) => ({
    ...state,
    bookmarks: state.bookmarks.filter(b => b.id !== id)
  })),
);

export function bookmarkReducer(state: IBookmarksState = bookmarkInitialState, action: Action) {
  return reducer(state, action);
}

export function toggleBookMark(bookmarks: IBookmark[], entity: IBookmark): IBookmark[] {
  if (!!bookmarks.find(bookmark => bookmark.id === entity.id)) {
    return bookmarks.filter(bookmark => bookmark.id !== entity.id);
  }
  return [...bookmarks, entity];
}