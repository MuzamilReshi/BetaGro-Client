import http from "../http-common";

class PaymentDataService {
  getAll() {
    return http.get("/payments");
  }

  get(id) {
    return http.get(`/payments/${id}`);
  }

  create(data) {
    return http.post("/payments", data);
  }

  update(id, data) {
    return http.put(`/payments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/payments/${id}`);
  }

  deleteAll() {
    return http.delete(`/payments`);
  }

  findByTitle(title) {
    return http.get(`/payments?title=${title}`);
  }
}

export default new PaymentDataService();