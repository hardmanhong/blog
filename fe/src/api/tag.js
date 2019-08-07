import request from "@/request";
const apis = {
  getTagList: () => {
    return request.get("/getTagList");
  },
  
  editTag: ({id,name,color}) => {
    return request.post("/editTag",{id,name,color});
  },
  deleteTag: id => {
    return request.post("/deleteTag", {
      id
    });
  }
};
export default apis;
