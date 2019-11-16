import axios from "axios";

const api = {
  getTenants() {
    return axios.get("/tenants");
  },
  deleteTenant(id) {
    return axios.delete("/tenants", { params: { id } });
  },
  addTenant(vendor) {
    return axios.post("/tenants", vendor);
  },
  updateTenant(tenant) {
    return axios.put("/tenants", { tenant });
  }
};

export default api;
