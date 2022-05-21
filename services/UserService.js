import Service from "./Service.js";

class UserService extends Service {
  handleError(error) {
    console.log();
    console.log("자식", error);

    return super.handleError(error);
  }

  getUsers() {
    return this.get("/users");
  }
}

export default new UserService();
