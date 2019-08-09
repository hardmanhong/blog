export const SET_PATH_BY_ID = "SET_PATH_BY_ID";
export const SET_BREADCRUMB = "SET_BREADCRUMB";
export const setPathById = (id,path) => ({
  type: SET_PATH_BY_ID,
  id,
  path
});
export const setBreadcrumb = (breadcrumb) => ({
  type: SET_BREADCRUMB,
  breadcrumb
});
