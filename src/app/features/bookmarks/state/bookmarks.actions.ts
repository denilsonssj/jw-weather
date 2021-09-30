import { createAction, props } from "@ngrx/store";

interface IRemoveBookmarkProps {
  id: number;
}

export const removeBookmark = createAction(
  '[Bookmark] Remove Bookmark',
  props<IRemoveBookmarkProps>(),
);