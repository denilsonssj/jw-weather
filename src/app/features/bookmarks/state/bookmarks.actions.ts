import { createAction, props } from "@ngrx/store";
import { IBookmark } from "src/app/core/models/Bookmark.model";

export const removeBookmark = createAction(
  '[Bookmark] Remove Bookmark',
  props<{ id: number }>(),
);

export const resetBookmarkState = createAction(
  '[Bookmark] Reset Bookmark State',
);

export const toggleBookmarkById = createAction(
  '[Bookmark] Toggle Bookmark By Id State',
  props<{ id: number }>(),
);

export const updateBookmarksList = createAction(
  '[Bookmark] Update Bookmarks List',
  props<{ bookmarks: IBookmark[] }>(),
);