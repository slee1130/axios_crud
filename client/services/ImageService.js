import Service from "./Service.js";

class ImageService extends Service {
  handleError(error) {
    return super.handleError(error);
  }

  getSearchImages({ page = 1, per_page = 5, query }) {
    // TODO1: axios get query 사용
    // TODO2: client_id query 공통화
    return this.get(
      `/search/photos?page=${page}&per_page=${per_page}&query=${query}&client_id=jfsU0QW5qsWWCrWXbMWFdEmRxlFBzkYxCtrDkhThcfU`
    );
  }
}
export default new ImageService({ baseURL: "https://api.unsplash.com" });
