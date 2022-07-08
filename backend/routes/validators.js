//Validators module

const {body, param} = require('express-validator');

const DEVICE_TYPES = ['BULB', 'RADIATOR', 'TV', 'FRIDGE', 'KETTLE'];

const BULB_STATES = ['on', 'off'];
const BULB_COLORS = ['red', 'green', 'yellow', 'white'];

const RADIATOR_STATES = ['heating', 'cooling', 'off'];

const TV_STATES = ['on', 'off', 'sleeping'];

const FRIDGE_STATES = ['on', 'off', 'maintenance'];

const KETTLE_STATES = ['on', 'off'];

const deviceNameValidator = body("name", "should be alphanumeric (space, - and _ are also allowed) string with length from 1 to 50")
    .exists({checkFalsy: true, checkNull: true})
    .trim()
    .isString()
    .isLength({min: 1, max: 50})
    .isAlphanumeric("en-US", {ignore: " -_"});

const deviceTypeValidator = body("type", `should be one of the values: ${DEVICE_TYPES}`)
    .exists({checkFalsy: true, checkNull: true})
    .trim()
    .isString()
    .isIn(DEVICE_TYPES);

const deviceIpValidator = body("ip", "should be valid IPv4 address")
    .exists({checkFalsy: true, checkNull: true})
    .trim()
    .isString()
    .isIP(4);

const deviceMacValidator = body("mac", "should be valid MAC address")
    .exists({checkFalsy: true, checkNull: true})
    .trim()
    .isString()
    .isMACAddress();

const deviceActiveValidator = body("active", "should be valid boolean value")
    .exists({checkNull: true})
    .trim()
    .isBoolean();

//Beside validation also removes redundant fields for managementAttributes object
const deviceManagementAttributesValidator = body("managementAttributes", "object should be present")
    .exists({checkFalsy: true, checkNull: true})
    .isObject()
    .customSanitizer((value, {req}) => {
        switch (req.body.type) {
            case "BULB":
                return {status: value.status, color: value.color, brightness: value.brightness};
            case "RADIATOR":
                return {status: value.status, temperature: value.temperature};
            case "TV":
                return {status: value.status, brightness: value.brightness, volume: value.volume};
            case "FRIDGE":
                return {status: value.status, temperature: value.temperature};
            case "KETTLE":
                return {status: value.status, heaterTemperature: value.heaterTemperature};
            default:
                return {};
        }
    });

//Validators for values from range
const rangeValidator = (type, field, values) => {
    return body(`managementAttributes.${field}`, `should be one of the values: ${values}`)
        .if(body("type").equals(type))
        .exists({checkFalsy: true, checkNull: true})
        .trim()
        .isString()
        .isIn(values);
};
const bulbStatusValidator = rangeValidator("BULB", "status", BULB_STATES);
const radiatorStatusValidator = rangeValidator("RADIATOR", "status", RADIATOR_STATES);
const tvStatusValidator = rangeValidator("TV", "status", TV_STATES);
const fridgeStatusValidator = rangeValidator("FRIDGE", "status", FRIDGE_STATES);
const kettleStatusValidator = rangeValidator("KETTLE", "status", KETTLE_STATES);
const deviceColorValidator = rangeValidator("BULB", "color", BULB_COLORS);

//Validators for integer values
const intRangeValidator = (types, field) => {
    return body(`managementAttributes.${field}`, `should be an integer in range from 1 till 100`)
        .if(body("type").isIn(types))
        .exists({checkFalsy: true, checkNull: true})
        .isInt({min: 1, max: 100});
}
const deviceBrightnessValidator = intRangeValidator(["BULB", "TV"], "brightness");
const deviceTemperatureValidator = intRangeValidator(["RADIATOR", "FRIDGE"], "temperature");
const deviceVolumeValidator = intRangeValidator(["TV"], "volume");
const deviceHeaterTemperatureValidator = intRangeValidator(["KETTLE"], "heaterTemperature");

const deviceIdValidator = param("id", `should be a positive integer`)
    .exists({checkFalsy: true, checkNull: true})
    .isInt({gt: 0});

const deviceValidationChain = [
    deviceNameValidator,
    deviceTypeValidator,
    deviceIpValidator,
    deviceMacValidator,
    deviceActiveValidator,
    deviceManagementAttributesValidator,
    bulbStatusValidator,
    radiatorStatusValidator,
    tvStatusValidator,
    fridgeStatusValidator,
    kettleStatusValidator,
    deviceColorValidator,
    deviceBrightnessValidator,
    deviceTemperatureValidator,
    deviceVolumeValidator,
    deviceHeaterTemperatureValidator
];
const idValidationChain = [deviceIdValidator];
const idWithDeviceValidationChain = idValidationChain.concat(deviceValidationChain);

module.exports = {
    BULB_STATES: BULB_STATES,
    BULB_COLORS: BULB_COLORS,
    RADIATOR_STATES: RADIATOR_STATES,
    TV_STATES: TV_STATES,
    FRIDGE_STATES: FRIDGE_STATES,
    KETTLE_STATES: KETTLE_STATES,
    deviceValidationChain: deviceValidationChain,
    idValidationChain: idValidationChain,
    idWithDeviceValidationChain: idWithDeviceValidationChain
}

