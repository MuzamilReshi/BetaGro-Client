import http from "../http-common";

class OutletDataService {
  getAll() {
    return http.get("/outlets");
  }

  get(id) {
    return http.get(`/outlets/${id}`);
  }

  create(data) {
    return http.post("/outlets", data);
  }

  update(id, data) {
    return http.put(`/outlets/${id}`, data);
  }

  delete(id) {
    return http.delete(`/outlets/${id}`);
  }

  deleteAll() {
    return http.delete(`/outlets`);
  }

  findByTitle(title) {
    return http.get(`/outlets?title=${title}`);
  }
}

export default new OutletDataService();