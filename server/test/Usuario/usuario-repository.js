import { api } from "../api";

class UserRepository {
  constructor(collection) {
    this.collection = collection;
  }
  static async getUsuarios() {
    return api.get("/usuarios");
  }
}
module.exports = UserRepository;
