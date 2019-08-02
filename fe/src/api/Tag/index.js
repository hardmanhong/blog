import request from "@/request";
const apis = {
  createTag: ({ name, color }) => {
    return request.post("/createTag", {
      name,
      color
    },{headers:{catchCode:true}});
  },
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
