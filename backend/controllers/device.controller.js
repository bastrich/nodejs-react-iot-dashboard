const dao = require("../db/dao.js");

const BULB_STATES = ['on', 'off']
const BULB_COLORS = ['red', 'green', 'yellow', 'white']

const RADIATOR_STATES = ['heating', 'cooling', 'off']

const TV_STATES = ['on', 'off', 'sleeping']

const FRIDGE_STATES = ['on', 'off', 'maintenance']

const KETTLE_STATES = ['on', 'off']

Array.prototype.random = function() {
    return this[Math.floor(Math.random()*this.length)]
}

// Create a new device
exports.create = (req, res) => {
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
                message:  `Error creating device: ${err.message}`
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


// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
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