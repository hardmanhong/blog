export const types = {
  SET_PATH_BY_ID: "SET_PATH_BY_ID",
  SET_BREADCRUMB: "SET_BREADCRUMB",
  SET_SELECTED_MENU_KEYS: "SET_SELECTED_MENU_KEYS",
  SET_OPEN_MENU_KEYS: "SET_OPEN_MENU_KEYS",
  SET_MENUS: "SET_MENUS",
};
export const setPathById = (id, pathName) => ({
  type: types.SET_PATH_BY_ID,
  id,
  pathName
});
export const setSelectedMenuKyes = (selectedMenuKeys) => {
  return ({
    type: types.SET_SELECTED_MENU_KEYS,
    selectedMenuKeys,
  })
};
export const setOpenMenuKyes = (openMenuKeys) => {
  return ({
    type: types.SET_OPEN_MENU_KEYS,
    openMenuKeys,
  })
};
export const setBreadcrumb = breadcrumb => ({
  type: types.SET_BREADCRUMB,
  breadcrumb
});

