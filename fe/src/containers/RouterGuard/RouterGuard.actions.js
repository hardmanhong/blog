export const types = {
  SET_PATH_BY_ID: "SET_PATH_BY_ID",
  SET_BREADCRUMB: "SET_BREADCRUMB",
  SET_CURRENT_MENU: "SET_CURRENT_MENU"

};
export const setPathById = (id, path) => ({
  type: types.SET_PATH_BY_ID,
  id,
  path
});
export const setCurrentMenu = (currentMenu) => {
  console.log('setCurrentMenu',currentMenu)
  return ({
    type: types.SET_CURRENT_MENU,
    currentMenu,
  })
};
export const setBreadcrumb = breadcrumb => ({
  type: types.SET_BREADCRUMB,
  breadcrumb
});
