import request from "@/request";

export default {
  getTagList: () => {
    return request.get("/getTagList");
  },

  editTag: ({ id, name, color }) => {
    return request.post("/editTag", { id, name, color });
  },
  deleteTag: id => {
    return request.post("/deleteTag", {
      id
    });
  }
};
