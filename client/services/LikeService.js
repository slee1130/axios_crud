import Service from "./Service.js";

class LikeService extends Service {
  handleError(error) {
    return super.handleError(error);
  }

  getLikes() {
    return this.get("/likes");
  }

  likeImage(data) {
    return this.post("/likes", data);
  }
}

export default new LikeService({ baseURL: "http://localhost:3001" });
