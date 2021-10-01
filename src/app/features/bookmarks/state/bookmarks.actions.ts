import { createAction, props } from "@ngrx/store";

interface IRemoveBookmarkProps {
  id: number;
}

export const removeBookmark = createAction(
  '[Bookmark] Remove Bookmark',
  props<IRemoveBookmarkProps>(),
);

export const resetBookmarkState = createAction(
  '[Bookmark] Reset Bookmark State',
);