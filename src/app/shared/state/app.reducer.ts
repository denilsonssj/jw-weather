import { ActionReducerMap } from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";

import { ICustomRouteState } from "./router/router.reducer";

export interface IAppState {
  router: RouterReducerState<ICustomRouteState>,
}

export const reducers: ActionReducerMap<IAppState> = {
  router: routerReducer,
};