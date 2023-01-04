import http from "../http-common";

class CouponDataService {
  getAll() {
    return http.get("/coupons");
  }

  get(id) {
    return http.get(`/coupons/${id}`);
  }

  create(data) {
    return http.post("/coupons", data);
  }

  update(id, data) {
    return http.put(`/coupons/${id}`, data);
  }

  delete(id) {
    return http.delete(`/coupons/${id}`);
  }

  deleteAll() {
    return http.delete(`/coupons`);
  }

  findByTitle(title) {
    return http.get(`/coupons?title=${title}`);
  }
}

export default new CouponDataService();