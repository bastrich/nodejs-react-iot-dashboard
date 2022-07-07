import React from "react";
import DeviceDataService from "../services/device.service";
import {NotificationManager} from 'react-notifications';

import 'react-notifications/lib/notifications.css';

import {
    // useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select, Slider,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";

const BULB_STATES = ['on', 'off']
const BULB_COLORS = ['red', 'green', 'yellow', 'white']

const RADIATOR_STATES = ['heating', 'cooling', 'off']

const TV_STATES = ['on', 'off', 'sleeping']

const FRIDGE_STATES = ['on', 'off', 'maintenance']

const KETTLE_STATES = ['on', 'off']

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

    useEffect(() => {
        if (id) {
            getDevice(id);
            setMode("EDIT")
        } else {
            setMode("CREATE")
        }
    }, [id]);


    const onChangeName = (e) => {
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

    const onChangeIp = (e) => {
        setIp(e.target.value)
    }

    const onChangeMac = (e) => {
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
        setManagementAttributes({...managementAttributes, brightness: e.target.value})
    }

    const onChangeTemperature = (e) => {
        setManagementAttributes({...managementAttributes, temperature: e.target.value})
    }

    const onChangeVolume = (e) => {
        setManagementAttributes({...managementAttributes, volume: e.target.value})
    }

    const onChangeHeaterTemperature = (e) => {
        setManagementAttributes({...managementAttributes, heaterTemperature: e.target.value})
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

    const createDevice = () => {
        const device = {
            name: name,
            type: type,
            ip: ip,
            mac: mac,
            active: active,
            managementAttributes: managementAttributes
        };
        DeviceDataService.create(device)
            .then(response => {
                navigate(`/devices/${response.data.id}/edit`);
                NotificationManager.success(`Device successfully created with id ${response.data.id}`)
            })
            .catch(error => {
                if (error.response) {
                    NotificationManager.error(`Error creating a device: ${error.response.data.message}`)
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
        DeviceDataService.update(id, device)
            .then(response => {
                NotificationManager.success(`Device ${id} successfully updated`)
            })
            .catch(error => {
                if (error.response) {
                    NotificationManager.error(`Error updating a device: ${error.response.data.message}`)
                } else {
                    NotificationManager.error(`Error updating a device: ${error}`)
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
            <FormGroup
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1},
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeName}
                    required
                />
                <FormControl fullWidth>
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
                />
                <TextField
                    id="mac"
                    label="MAC"
                    variant="outlined"
                    value={mac}
                    onChange={onChangeMac}
                    required
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

                <Button
                    onClick={mode === "CREATE" ? createDevice : updateDevice}
                >
                    {mode === "CREATE" ? (<p>Create</p>) : (<p>Update</p>)}
                </Button>
            </FormGroup>
        );
}

export default AddEditDevice