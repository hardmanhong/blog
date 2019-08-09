import SET_PATH_BY_ID from "./RouterGuard.actions";
const routePath = (state = {}, action) => {
  switch (action.type) {
    case SET_PATH_BY_ID:
      const obj = { ...state };
      if (obj.id) {
        obj.id !== path && (obj.id = path);
      } else {
        obj.id = path;
      }
      return obj;
    default:
      return state;
  }
};
export default routePath;
