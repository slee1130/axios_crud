import Service from "./Service.js";

class LikeService extends Service {
  handleError(error) {
    console.log();
    console.log("자식", error);

    return super.handleError(error);
  }

  getImage(id) {
    return this.get(`/${id}`);
  }

  likeImage(data) {
    return this.post("/likes", data);
  }
}

export default new LikeService({ baseURL: "http://localhost:3001" });
