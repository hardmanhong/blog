import request from "@/request";

export default {
  getTagList: () => {
    return request.get("api/getTagList");
  },

  editTag: ({ id, name, color }) => {
    return request.post("api/editTag", { id, name, color });
  },
  deleteTag: id => {
    return request.post("api/deleteTag", {
      id
    });
  }
};
