import request from "@/request";
export default {
  signup: ({ username = "", password = "" }) => {
    return request.post("/signup", {
      username,
      password
    });
  },
  login: ({ username = "", password = "" }) => {
    return request.post("/login", {
      username,
      password
    });
  }
};
