module.exports = app => {
    const devices = require("../controllers/device.controller.js");
    const router = require("express").Router();

    // Create a new Tutorial
    router.post("/", devices.create);
    // Retrieve all Tutorials
    router.get("/", devices.getAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", devices.getById);
    // Update a Tutorial with id
    router.put("/:id", devices.update);
    // Delete a Tutorial with id
    router.delete("/:id", devices.delete);

    app.use('/api/devices', router);
};