export const SET_PATH_BY_ID = "SET_PATH_BY_ID";
export const setPathById = (id,path) => ({
  type: SET_PATH_BY_ID,
  id,
  path
});
