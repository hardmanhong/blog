import { SET_PATH_BY_ID, SET_BREADCRUMB } from "./RouterGuard.actions";
const routePath = (state = {}, action) => {
  switch (action.type) {
    case SET_PATH_BY_ID:
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
    case SET_BREADCRUMB:
      return action.breadcrumb;
    default:
      return state;
  }
};
export { routePath, breadcrumb };
