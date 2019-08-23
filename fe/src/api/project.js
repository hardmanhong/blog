import request from "@/request";

export default {
  editProject: ({
    id = "",
    title = "",
    cover = '',
    markdown = "",
    html = "",
    status = null
  }) => {
    return request.post("api/editProject", {
      id,
      title,
      cover,
      markdown,
      html,
      status
    });
  },
  getProjectItem: id => {
    return request.get("api/getProjectItem", { params: { id } });
  },
  getProjectList: params => {
    return request.get("api/getProjectList", {
      params
    });
  },
  deleteProject: id => {
    return request.post("api/deleteProject", {
      id
    });
  }
};
