import axios from "axios";

class Service {
  service;

  constructor(config) {
    this.service = axios.create({
      baseURL: "http://localhost:3001",
      ...config,
    });

    this.service.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  get(url, config) {
    return this.service.get(url, config);
  }
  post(url, data, config) {
    return this.service.post(url, data, config);
  }
  put(url, data, config) {
    return this.service.post(url, data, config);
  }
  delete(url, config) {
    return this.service.delete(url, config);
  }

  handleResponse(response) {
    return response.data;
  }

  handleError(error) {
    console.log("부모", error);
    return Promise.reject(error);
  }
}

export default Service;
