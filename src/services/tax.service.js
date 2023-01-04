import http from "../http-common";

class TaxDataService {
  getAll() {
    return http.get("/taxs");
  }

  get(id) {
    return http.get(`/taxs/${id}`);
  }

  create(data) {
    return http.post("/taxs", data);
  }

  update(id, data) {
    return http.put(`/taxs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/taxs/${id}`);
  }

  deleteAll() {
    return http.delete(`/taxs`);
  }

  findByTitle(title) {
    return http.get(`/taxs?title=${title}`);
  }
}

export default new TaxDataService();