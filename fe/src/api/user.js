import request from "@/request";
export default {
  signup: ({ username = "", password = "" }) => {
    return request.post("api/signup", {
      username,
      password
    });
  },
  login: ({ username = "", password = "" }) => {
    return request.post("api/login", {
      username,
      password
    });
  },
  logout: () => {
    return request.post("api/logout");
  },
};
