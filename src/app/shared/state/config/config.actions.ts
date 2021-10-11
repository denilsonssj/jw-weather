import { createAction, props } from "@ngrx/store";

import { Unit } from "src/app/core/models/Unit.enum";

export const updateUnit = createAction(
  '[Config] Update Init',
  props<{ unit: Unit }>(),
);