import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface ICustomRouteState {
  url: string;
  params: Params;
  queryParams: Params;
  fragment: string | null;
}

export const routerKeyName: string = 'router';

export class CustomRouterSerializer implements RouterStateSerializer<ICustomRouteState> {
  serialize(routerState: RouterStateSnapshot): ICustomRouteState {
    const { url, root: { queryParams, fragment } } = routerState;
    let route: ActivatedRouteSnapshot | null = routerState.root;
    const params: Params = {};
    do {
      if (!!route.params) {
        Object.keys(route.params).forEach(key => {
          params[key] = route?.params[key];
        });
      }
      route = route.firstChild;
    } while(!!route);
    return { url, params, queryParams, fragment };
  }
}