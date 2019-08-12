import { types } from "./RouterGuard.actions";
const routePath = (state = {}, action) => {
  switch (action.type) {
    case types.SET_PATH_BY_ID:
      const obj = { ...state };
      if (obj[action.id]) {
        obj[action.id] !== action.path && (obj[action.id] = action.path);
      } else {
        obj[action.id] = action.path;
      }
      return obj;
    default:
      return state;
  }
};
const breadcrumb = (state = [], action) => {
  switch (action.type) {
    case types.SET_BREADCRUMB:
      return action.breadcrumb;
    default:
      return state;
  }
};
const currentMenu = (state = [], action) => {
  switch (action.type) {
    case types.SET_CURRENT_MENU:
      return action.currentMenu;
    default:
      return state;
  }
};
export { routePath, breadcrumb,currentMenu };
