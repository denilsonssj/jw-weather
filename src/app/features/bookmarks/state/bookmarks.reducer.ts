import { createReducer, Action, on } from "@ngrx/store";

import { IBookmark } from "src/app/core/models/Bookmark.model";
import { toggleBookmark as toggleBookmarkAction } from "../../home/state/home.actions";
import { removeBookmark } from "./bookmarks.actions";

export interface IBookmarksState {
  list: IBookmark[];
}

export const bookmarkInitialState: IBookmarksState = {
  list: [],
};

const reducer = createReducer(
  bookmarkInitialState,
  on(toggleBookmarkAction, (state, { entity }) => ({
    ...state,
    list: toggleBookMark(state.list, entity),
  })),
  on(removeBookmark, (state, { id }) => ({
    ...state,
    list: state.list.filter(b => b.id !== id)
  })),
);

export function bookmarkReducer(state: IBookmarksState | undefined, action: Action) {
  return reducer(state, action);
}

export function toggleBookMark(list: IBookmark[], entity: IBookmark): IBookmark[] {
  if (!!list.find(bookmark => bookmark.id === entity.id)) {
    return list.filter(bookmark => bookmark.id !== entity.id);
  }
  return [...list, entity];
}