import http from "../http-common";

class AdjustmentDataService {
  getAll() {
    return http.get("/adjustments");
  }

  get(id) {
    return http.get(`/adjustments/${id}`);
  }

  create(data) {
    return http.post("/adjustments", data);
  }

  update(id, data) {
    return http.put(`/adjustments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/adjustments/${id}`);
  }

  deleteAll() {
    return http.delete(`/adjustments`);
  }

  findByTitle(title) {
    return http.get(`/adjustments?title=${title}`);
  }
}

export default new AdjustmentDataService();