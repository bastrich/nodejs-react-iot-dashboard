//Router module
module.exports = app => {
    const { idValidationChain, deviceValidationChain, idWithDeviceValidationChain } = require('./validators');
    const devices = require("../controllers/device.controller.js");
    const router = require("express").Router();

    // Create a new device
    router.post("/", deviceValidationChain, devices.create);
    // Retrieve all devices
    router.get("/", devices.getAll);
    // Retrieve a single device with id
    router.get("/:id", idValidationChain, devices.getById);
    // Update a device with id
    router.put("/:id", idWithDeviceValidationChain, devices.update);
    // Delete a device with id
    router.delete("/:id", idValidationChain, devices.delete);

    app.use('/api/devices', router);
};

