import { types } from "./RouterGuard.actions";
const routeTrace = (state = {}, action) => {
  switch (action.type) {
    case types.SET_PATH_BY_ID:
      const {id,pathName} = action;
      const obj = { ...state };
      if (obj[id]) {
        obj[id] !== pathName && (obj[id] = pathName);
      } else {
        obj[id] = pathName;
      }
      return obj;
    default:
      return state;
  }
};
const breadcrumb = (state = [], action) => {
  switch (action.type) {
    case types.SET_BREADCRUMB:
      return [...action.breadcrumb];
    default:
      return state;
  }
};
const selectedMenuKeys = (state = ["1"], action) => {
  switch (action.type) {
    case types.SET_SELECTED_MENU_KEYS:
      return action.selectedMenuKeys.length ? [...action.selectedMenuKeys] : ["1"];
    default:
      return state;
  }
};
const openMenuKeys = (state = ["1"], action) => {
  switch (action.type) {
    case types.SET_OPEN_MENU_KEYS:
      return action.openMenuKeys.length ? [...action.openMenuKeys] : ["1"];
    default:
      return state;
  }
};

export { routeTrace, breadcrumb, openMenuKeys, selectedMenuKeys };
