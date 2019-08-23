import request from "@/request";

export default {
  editPost: ({
    id = "",
    title = "",
    tag = [],
    markdown = "",
    html = "",
    status = null
  }) => {
    return request.post("api/editPost", {
      id,
      title,
      tag,
      markdown,
      html,
      status
    });
  },
  getPostItem: id => {
    return request.get("api/getPostItem", { params: { id } });
  },
  getPostList: params => {
    return request.get("api/getPostList", {
      params
    });
  },
  deletePost: id => {
    return request.post("api/deletePost", {
      id
    });
  }
};
