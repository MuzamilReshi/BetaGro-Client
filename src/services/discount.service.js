import http from "../http-common";

class DiscountDataService {
  getAll() {
    return http.get("/discounts");
  }

  get(id) {
    return http.get(`/discounts/${id}`);
  }

  create(data) {
    return http.post("/discounts", data);
  }

  update(id, data) {
    return http.put(`/discounts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/discounts/${id}`);
  }

  deleteAll() {
    return http.delete(`/discounts`);
  }

  findByTitle(title) {
    return http.get(`/discounts?title=${title}`);
  }
}

export default new DiscountDataService();