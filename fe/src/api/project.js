import request from "@/request";

export default {
  editProject: ({
    id = "",
    title = "",
    tag = [],
    markdown = "",
    html = "",
    status = null
  }) => {
    return request.post("/editPost", {
      id,
      title,
      tag,
      markdown,
      html,
      status
    });
  },
  getProjectItem: id => {
    return request.get("/getPostItem", { params: { id } });
  },
  getProjectList: params => {
    return request.get("/getPostList", {
      params
    });
  },
  deleteProject: id => {
    return request.post("/deletePost", {
      id
    });
  }
};
