import React from "react";
import DeviceDataService from "../services/device.service";
import {NotificationManager} from 'react-notifications';

import 'react-notifications/lib/notifications.css';

import {
    useNavigate,
    useParams
} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select, Slider, Stack,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";

const BULB_STATES = ['on', 'off']
const BULB_COLORS = ['red', 'green', 'yellow', 'white']

const RADIATOR_STATES = ['heating', 'cooling', 'off']

const TV_STATES = ['on', 'off', 'sleeping']

const FRIDGE_STATES = ['on', 'off', 'maintenance']

const KETTLE_STATES = ['on', 'off']

const SubmitButton = (props) => {
    return (
        <Button
            key={props.text}
            onClick={props.onClick}
            sx={{
                my: 2,
                color: 'white',
                backgroundColor: 'CornflowerBlue',
                display: 'block',
                '&:hover': {
                    backgroundColor: 'DeepSkyBlue'
                }
            }}
        >
            {props.text}
        </Button>
    )
}

const AddEditDevice = () => {
    const navigate = useNavigate();

    const [id, setId] = useState(useParams().id || null)
    const [name, setName] = useState("")
    const [type, setType] = useState("BULB")
    const [ip, setIp] = useState("")
    const [mac, setMac] = useState("")
    const [active, setActive] = useState(false)
    const [managementAttributes, setManagementAttributes] = useState({
        status: "on", color: "white", brightness: 50
    })

    const [mode, setMode] = useState("CREATE")
    const [nameHelperText, setNameHelperText] = useState("")
    const [ipHelperText, setIpHelperText] = useState("")
    const [macHelperText, setMacHelperText] = useState("")

    useEffect(() => {
        if (id) {
            getDevice(id);
            setMode("EDIT")
        } else {
            setMode("CREATE")
        }
    }, [id]);

    const validateName = (value) => {
        if (/^[a-z\d\- _]{1,50}$/i.test(value)) {
            return null;
        }
        return "'Name' should be alphanumeric (space, - and _ are also allowed) string with length from 1 to 50";
    }

    const onChangeName = (e) => {
        const validationMessage = validateName(e.target.value)
        if (validationMessage) {
            setNameHelperText(validationMessage)
        } else {
            setNameHelperText("")
        }
        setName(e.target.value)
    }

    const onChangeType = (e) => {
        const chosenType = e.target.value
        switch (chosenType) {
            case "BULB":
                setManagementAttributes({
                    status: "on", color: "white", brightness: 50
                })
                break;
            case "RADIATOR":
                setManagementAttributes({
                    status: "heating", temperature: 50
                })
                break;
            case "TV":
                setManagementAttributes({
                    status: "on", brightness: 50, volume: 20
                })
                break;
            case "FRIDGE":
                setManagementAttributes({
                    status: "on", temperature: 10
                })
                break;
            case "KETTLE":
                setManagementAttributes({
                    status: "on", heaterTemperature: 80
                })
                break;
        }
        setType(chosenType)
    }

    const validateIp = (value) => {
        if (/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(value)) {
            return null;
        }
        return "IP should be valid IPv4 address";
    }

    const onChangeIp = (e) => {
        const validationMessage = validateIp(e.target.value)
        if (validationMessage) {
            setIpHelperText(validationMessage)
        } else {
            setIpHelperText("")
        }
        setIp(e.target.value)
    }

    const validateMac = (value) => {
        if (/^[\da-f]{1,2}([\.:-])(?:[\da-f]{1,2}\1){4}[\da-f]{1,2}$/i.test(value)) {
            return null;
        }
        return "MAC should be valid MAC address";
    }

    const onChangeMac = (e) => {
        const validationMessage = validateMac(e.target.value)
        if (validationMessage) {
            setMacHelperText(validationMessage)
        } else {
            setMacHelperText("")
        }
        setMac(e.target.value)
    }

    const onChangeActive = (e) => {
        setActive(e.target.checked)
    }

    const onChangeStatus = (e) => {
        setManagementAttributes({...managementAttributes, status: e.target.value})
    }

    const onChangeColor = (e) => {
        setManagementAttributes({...managementAttributes, color: e.target.value})
    }

    const onChangeBrightness = (e) => {
        setManagementAttributes({...managementAttributes, brightness: parseInt(e.target.value)})
    }

    const onChangeTemperature = (e) => {
        setManagementAttributes({...managementAttributes, temperature: parseInt(e.target.value)})
    }

    const onChangeVolume = (e) => {
        setManagementAttributes({...managementAttributes, volume: parseInt(e.target.value)})
    }

    const onChangeHeaterTemperature = (e) => {
        setManagementAttributes({...managementAttributes, heaterTemperature: parseInt(e.target.value)})
    }

    const getDevice = (id) => {
        DeviceDataService.getById(id)
            .then(response => {
                setId(response.data.id)
                setName(response.data.name)
                setType(response.data.type)
                setIp(response.data.ip)
                setMac(response.data.mac)
                setActive(response.data.active)
                setManagementAttributes(response.data.managementAttributes)
            })
            .catch(e => {

            });
    }

    const validateDevice = (device) => {
        const nameValidationMessage = validateName(device.name)
        const ipValidationMessage = validateIp(device.ip)
        const macValidationMessage = validateMac(device.mac)

        return [
            nameValidationMessage,
            ipValidationMessage,
            macValidationMessage
        ].filter(message => message != null)
    }

    const createDevice = () => {
        const device = {
            name: name,
            type: type,
            ip: ip,
            mac: mac,
            active: active,
            managementAttributes: managementAttributes
        };

        const validations = validateDevice(device)
        if (validations.length > 0) {
            validations.forEach(validation => {
                NotificationManager.error(validation, "Error creating a device", 10000)
            })
            return;
        }

        DeviceDataService.create(device)
            .then(response => {
                navigate(`/devices/${response.data.id}/edit`);
                setMode("EDIT")
                setId(response.data.id)
                NotificationManager.success(`Device successfully created with id ${response.data.id}`)
            })
            .catch(error => {
                if (error.response) {
                    error.response.data.messages.forEach(message => {
                        NotificationManager.error(message, "Error creating a device", 10000)
                    })
                } else {
                    NotificationManager.error(`Error creating a device: ${error}`)
                }
            });
    }

    const updateDevice = () => {
        const device = {
            name: name,
            type: type,
            ip: ip,
            mac: mac,
            active: active,
            managementAttributes: managementAttributes
        };

        const validations = validateDevice(device)
        if (validations.length > 0) {
            validations.forEach(validation => {
                NotificationManager.error(validation, "Error updating the device", 10000)
            })
            return;
        }

        DeviceDataService.update(id, device)
            .then(response => {
                NotificationManager.success(`Device ${id} successfully updated`)
            })
            .catch(error => {
                if (error.response) {
                    error.response.data.messages.forEach(message => {
                        NotificationManager.error(message, "Error updating the device", 10000)
                    })
                } else {
                    NotificationManager.error(`Error updating the device: ${error}`)
                }
            });
    }

    const renderStatusOptions = (options) => {
        return (
            <FormControl>
                <InputLabel id="status-lable">Target Status</InputLabel>
                <Select
                    labelId="status-lable"
                    id="status"
                    value={managementAttributes.status}
                    label="Target Status"
                    onChange={onChangeStatus}
                >
                    {options.map((option) => {
                        return (<MenuItem key={option} value={option}>{option}</MenuItem>)
                    })}
                </Select>
            </FormControl>
        )
    }

    const renderStatusSelector = () => {
        switch (type) {
            case "BULB":
                return renderStatusOptions(BULB_STATES);
            case "RADIATOR":
                return renderStatusOptions(RADIATOR_STATES);
            case "TV":
                return renderStatusOptions(TV_STATES);
            case "FRIDGE":
                return renderStatusOptions(FRIDGE_STATES);
            case "KETTLE":
                return renderStatusOptions(KETTLE_STATES);
        }

        return null;
    }

    const renderColorSelector = () => {
        if (type === "BULB") {
            return (
                <FormControl>
                    <InputLabel id="color-lable">Color</InputLabel>
                    <Select
                        labelId="color-lable"
                        id="color"
                        value={managementAttributes.color}
                        label="Color"
                        onChange={onChangeColor}
                    >
                        {BULB_COLORS.map((color) => {
                            return (<MenuItem key={color} value={color}>{color}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
            )
        }
        return null
    }

    const renderBrightnessSlider = () => {
        if (["BULB", "TV"].includes(type)) {
            return (
                <FormControlLabel
                    sx={{width: "50%"}}
                    control={<Slider
                        id="brightness"
                        value={managementAttributes.brightness}
                        min={1}
                        max={100}
                        onChange={onChangeBrightness}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                    />}
                    label="Target Brightness"
                />
            )
        }
        return null
    }

    const renderTemperatureSlider = () => {
        if (["RADIATOR", "FRIDGE"].includes(type)) {
            return (
                <FormControlLabel
                    sx={{width: "50%"}}
                    control={<Slider
                        id="temperature"
                        value={managementAttributes.temperature || 50}
                        min={1}
                        max={100}
                        onChange={onChangeTemperature}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                    />}
                    label="Target Temperature"
                />
            )
        }
        return null
    }

    const renderVolumeSlider = () => {
        if (type === "TV") {
            return (
                <FormControlLabel
                    sx={{width: "50%"}}
                    control={<Slider
                        id="volume"
                        value={managementAttributes.volume || 50}
                        min={1}
                        max={100}
                        onChange={onChangeVolume}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                    />}
                    label="Target Volume"
                />
            )
        }
        return null
    }

    const renderHeaterTemperatureSlider = () => {
        if (type === "KETTLE") {
            return (
                <FormControlLabel
                    sx={{width: "50%"}}
                    control={<Slider
                        id="heater-temperature"
                        value={managementAttributes.heaterTemperature || 50}
                        min={1}
                        max={100}
                        onChange={onChangeHeaterTemperature}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                    />}
                    label="Target Heater Temperature"
                />
            )
        }
        return null
    }

    return (
        <Stack alignItems={"flex-start"} justifyContent={"center"} spacing={2} maxWidth="md">
            <TextField
                id="name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={onChangeName}
                required
                error={nameHelperText.length > 0}
                helperText={nameHelperText}
            />
            <FormControl>
                <InputLabel id="type-lable">Type</InputLabel>
                <Select
                    labelId="type-lable"
                    id="type"
                    value={type}
                    label="Type"
                    onChange={onChangeType}
                >
                    <MenuItem value="BULB">BULB</MenuItem>
                    <MenuItem value="RADIATOR">RADIATOR</MenuItem>
                    <MenuItem value="TV">TV</MenuItem>
                    <MenuItem value="FRIDGE">FRIDGE</MenuItem>
                    <MenuItem value="KETTLE">KETTLE</MenuItem>
                </Select>
            </FormControl>

            <TextField
                id="ip"
                label="IP"
                variant="outlined"
                value={ip}
                onChange={onChangeIp}
                required
                error={ipHelperText.length > 0}
                helperText={ipHelperText}
            />
            <TextField
                id="mac"
                label="MAC"
                variant="outlined"
                value={mac}
                onChange={onChangeMac}
                required
                error={macHelperText.length > 0}
                helperText={macHelperText}
            />
            <FormControlLabel
                control={<Checkbox
                    id="active"
                    checked={active}
                    onChange={onChangeActive}
                />}
                label="Active"
            />
            {renderStatusSelector()}
            {renderColorSelector()}
            {renderBrightnessSlider()}
            {renderTemperatureSlider()}
            {renderVolumeSlider()}
            {renderHeaterTemperatureSlider()}

            <SubmitButton
                text={mode === "CREATE" ? "Create" : "Update"}
                onClick={mode === "CREATE" ? createDevice : updateDevice}
            />
        </Stack>
    );
}

export default AddEditDevice