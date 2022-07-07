//Service for interaction with backend

import http from "../helpers/http";
class DeviceDataService {
    create(device) {
        return http.post("/devices", device);
    }
    getAll() {
        return http.get("/devices");
    }
    getById(id) {
        return http.get(`/devices/${id}`);
    }
    update(id, device) {
        return http.put(`/devices/${id}`, device);
    }
    delete(id) {
        return http.delete(`/devices/${id}`);
    }
}
export default new DeviceDataService();