import { ActionReducerMap } from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";

import { ICustomRouteState } from "./router/router.reducer";
import { configReducer, IConfigState } from "./config/config.reducer";

export interface IAppState {
  router: RouterReducerState<ICustomRouteState>,
  config: IConfigState,
}

export const reducers: ActionReducerMap<IAppState> = {
  router: routerReducer,
  config: configReducer,
};