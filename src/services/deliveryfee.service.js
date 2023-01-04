import http from "../http-common";

class DeliveryFeeDataService {
  getAll() {
    return http.get("/deliveryfees");
  }

  get(id) {
    return http.get(`/deliveryfees/${id}`);
  }

  create(data) {
    return http.post("/deliveryfees", data);
  }

  update(id, data) {
    return http.put(`/deliveryfees/${id}`, data);
  }

  delete(id) {
    return http.delete(`/deliveryfees/${id}`);
  }

  deleteAll() {
    return http.delete(`/deliveryfees`);
  }

  findByTitle(title) {
    return http.get(`/deliveryfees?title=${title}`);
  }
}

export default new DeliveryFeeDataService();