export const types = {
  SET_COLLAPSED: "SET_COLLAPSED",
  TOGGLE_COLLAPSED: "TOGGLE_COLLAPSED"
};
export const setCollapsed = (collapsed) => ({
  type: types.SET_COLLAPSED,
  collapsed

})
export const toggleCollapsed = () =>( {
  type: types.TOGGLE_COLLAPSED
});
