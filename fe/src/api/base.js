import request from "@/request";

export default {
  upload: formData => {
    return request.post("api/upload", formData);
  }
};
