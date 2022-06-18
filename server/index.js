const users = require("./users.json");
const likes = require("./likes.json");

module.exports = () => ({
  users: users,
  likes: likes,
});
