module.exports = app => {
    const devices = require("../controllers/device.controller.js");
    const router = require("express").Router();
    // Create a new Tutorial
    router.post("/", devices.create);
    // Retrieve all Tutorials
    router.get("/", devices.getAll);
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
    // // Create a new Tutorial
    // router.delete("/", tutorials.deleteAll);
    app.use('/api/devices', router);
};