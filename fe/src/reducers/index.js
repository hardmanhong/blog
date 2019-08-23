import { combineReducers } from "redux";
import * as routerGuard from "@/containers/RouterGuard/RouterGuard.reduces.js";
import * as pageLayout from "@/containers/PageLayout/PageLayout.reducer.js";

import { types } from "@/actions/actions";
const menus = (state = [], action) => {
  switch (action.type) {
    case types.GENERATE_MENUS:
      return JSON.parse(JSON.stringify(action.menus));
    default:
      return state;
  }
};
const router = (state = [], action) => {
  switch (action.type) {
    case types.GENERATE_ROUTER:
      return action.router;
    default:
      return state;
  }
};
const routes = (state = [], action) => {
  switch (action.type) {
    case types.GENERATE_ROUTES:
      return action.routes;
    default:
      return state;
  }
};
const root = {
  menus,
  router,
  routes
};
export default combineReducers({
  ...root,
  ...routerGuard,
  ...pageLayout,
});
