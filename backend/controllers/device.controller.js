//Controller module

const {validationResult} = require('express-validator');
const {
    BULB_STATES,
    BULB_COLORS,
    RADIATOR_STATES,
    TV_STATES,
    FRIDGE_STATES,
    KETTLE_STATES
} = require('../routes/validators');
const dao = require("../db/dao.js");

Array.prototype.random = () => {
    return this[Math.floor(Math.random() * this.length)]
}

const validate = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return {
            message: errors.array()
                .map((error) => {
                    return `Field '${error.param}' ${error.msg}, passed value: ${error.value}`
                })
                .join("<br>")
        };
    }
}

// Create a new device
exports.create = (req, res) => {
    const validation = validate(req)
    if (validation) {
        res.status(400).send(validation)
        return;
    }

    const device = req.body

    switch (device.type) {
        case "BULB":
            device.monitoring_attributes = {
                status: BULB_STATES.random(),
                color: BULB_COLORS.random(),
                brightness: Math.floor(Math.random() * 100) + 1,
                temperature: Math.floor(Math.random() * 100) + 1
            }
            break;
        case "RADIATOR":
            device.monitoring_attributes = {
                status: RADIATOR_STATES.random(),
                temperature: Math.floor(Math.random() * 100) + 1
            }
            break;
        case "TV":
            device.monitoring_attributes = {
                status: TV_STATES.random(),
                brightness: Math.floor(Math.random() * 100) + 1,
                volume: Math.floor(Math.random() * 100) + 1
            }
            break;
        case "FRIDGE":
            device.monitoring_attributes = {
                status: FRIDGE_STATES.random(),
                temperature: Math.floor(Math.random() * 100) + 1
            }
            break;
        case "KETTLE":
            device.monitoring_attributes = {
                status: KETTLE_STATES.random(),
                heaterTemperature: Math.floor(Math.random() * 100) + 1,
                waterTemperature: Math.floor(Math.random() * 100) + 1
            }
            break;
    }

    dao.add(device)
        .then(id => {
            const response = {
                id: id
            }
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error creating device: ${err.message}`
            });
        });
};

// Retrieve all devices
exports.getAll = (req, res) => {
    dao.getAll()
        .then(devices => {
            const response = {
                devices: devices
            }
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error receiving list of all device: ${err.message}`
            });
        });
};

// Get a single device by id
exports.getById = (req, res) => {
    const validation = validate(req)
    if (validation) {
        res.status(400).send(validation)
        return;
    }

    dao.getById(req.params.id)
        .then(device => {
            if (device) {
                res.send(device);
            } else {
                res.status(404).send({
                    message: `Device ${req.params.id} not found`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error receiving a device: ${err.message}`
            });
        });
};

// Update a device by id
exports.update = (req, res) => {
    const validation = validate(req)
    if (validation) {
        res.status(400).send(validation)
        return;
    }

    dao.update(req.params.id, req.body)
        .then(affectedRows => {
            if (affectedRows === 0) {
                res.status(404).send({
                    message: `Device ${req.params.id} not found`
                });
            } else {
                const response = {
                    affectedDevices: affectedRows
                }
                res.send(response);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating device ${req.params.id}: ${err.message}`
            });
        });
};

// Delete a device with the specified id
exports.delete = (req, res) => {
    const validation = validate(req)
    if (validation) {
        res.status(400).send(validation)
        return;
    }

    dao.delete(req.params.id)
        .then(affectedRows => {
            if (affectedRows === 0) {
                res.status(404).send({
                    message: `Device ${req.params.id} not found`
                });
            } else {
                const response = {
                    affectedDevices: affectedRows
                }
                res.send(response);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error deleting device ${req.params.id}: ${err.message}`
            });
        });
};