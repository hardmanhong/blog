import request from "@/request";
const apis = {
  editPost: ({ id = "", title = "", tag = [], markdown = "", html = "" }) => {
    return request.post("/editPost", {
      id,
      title,
      tag,
      markdown,
      html
    });
  },
  getPostItem: id => {
    return request.get("/getPostItem", { params: { id } });
  },
  getPostList: (params) => {
    return request.get("/getPostList", {
      params
    });
  },
  deletePost: id => {
    return request.post("/deletePost", {
      id
    });
  }
};
export default apis;
