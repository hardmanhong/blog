import { types } from "./PageLayout.action";

const collapsed = (state = false, action) => {
  switch (action.type) {
    case types.SET_COLLAPSED:
      return action.collapsed;
    case types.TOGGLE_COLLAPSED:
      return !state;
    default:
      return state;
  }
};
export { collapsed };
