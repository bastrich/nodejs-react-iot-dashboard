import React, {Component} from "react";
import DeviceDataService from "../services/device.service";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import 'react-notifications/lib/notifications.css';

import {
    // useLocation,
    // useNavigate,
    useParams
} from "react-router-dom";
import {useEffect, useState} from "@types/react";

const BULB_STATES = ['on', 'off']
const BULB_COLORS = ['red', 'green', 'yellow', 'white']

const RADIATOR_STATES = ['heating', 'cooling', 'off']

const TV_STATES = ['on', 'off', 'sleeping']

const FRIDGE_STATES = ['on', 'off', 'maintenance']

const KETTLE_STATES = ['on', 'off']

export const AddEditDevice = () => {

    const [id, setId] = useState(useParams().id || null)
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [ip, setIp] = useState("")
    const [mac, setMac] = useState("")
    const [managementAttributes, setManagementAttributes] = useState({})
    const [monitoringAttributes, setMonitoringAttributes] = useState({})
    this.state = {
        id: null, name: "", type: "BULB", ip: "", mac: "", active: false, managementAttributes: {
            status: "on", color: "white", brightness: 50
        }, mode: "CREATE"
    };

    useEffect(() => {
        const deviceId = this.props.router.params.id
        if (deviceId) {
            this.getDevice(deviceId);
            this.setState({
                mode: "EDIT"
            });
        } else {
            this.setState({
                mode: "CREATE"
            });
        }
    });


    const onChangeName = (e) => {
        setName(e.target.value)
    }

    onChangeType(e) {
        const type = e.target.value
        let managementAttributes
        switch (type) {
            case "BULB":
                managementAttributes = {
                    status: "on", color: "white", brightness: 50
                }
                break;
            case "RADIATOR":
                managementAttributes = {
                    status: "heating", temperature: 50
                }
                break;
            case "TV":
                managementAttributes = {
                    status: "on", brightness: 50, volume: 20
                }
                break;
            case "FRIDGE":
                managementAttributes = {
                    status: "on", temperature: 10
                }
                break;
            case "KETTLE":
                managementAttributes = {
                    status: "on", heaterTemperature: 80
                }
                break;
        }
        this.setState({
            type: type, managementAttributes: managementAttributes
        });
    }

    onChangeIp(e) {
        this.setState({
            ip: e.target.value
        });
    }

    onChangeMac(e) {
        this.setState({
            mac: e.target.value
        });
    }

    onChangeActive(e) {
        this.setState({
            active: e.target.value
        });
    }

    onChangeStatus(e) {
        const managementAttributes = {...this.state.managementAttributes}
        managementAttributes.status = e.target.value
        this.setState({
            managementAttributes: managementAttributes
        });
    }

    onChangeColor(e) {
        const managementAttributes = {...this.state.managementAttributes}
        managementAttributes.color = e.target.value
        this.setState({
            managementAttributes: managementAttributes
        });
    }

    onChangeBrightness(e) {
        const managementAttributes = {...this.state.managementAttributes}
        managementAttributes.brightness = e.target.value
        this.setState({
            managementAttributes: managementAttributes
        });
    }

    onChangeTemperature(e) {
        const managementAttributes = {...this.state.managementAttributes}
        managementAttributes.temperature = e.target.value
        this.setState({
            managementAttributes: managementAttributes
        });
    }

    onChangeVolume(e) {
        const managementAttributes = {...this.state.managementAttributes}
        managementAttributes.volume = e.target.value
        this.setState({
            managementAttributes: managementAttributes
        });
    }

    onChangeHeaterTemperature(e) {
        const managementAttributes = {...this.state.managementAttributes}
        managementAttributes.heaterTemperature = e.target.value
        this.setState({
            managementAttributes: managementAttributes
        });
    }

    getDevice(id) {
        DeviceDataService.getById(id)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    type: response.data.type,
                    ip: response.data.ip,
                    mac: response.data.mac,
                    active: response.data.active,
                    managementAttributes: response.data.managementAttributes
                });
            })
            .catch(e => {

            });
    }

    createDevice() {
        const device = {
            name: this.state.name,
            type: this.state.type,
            ip: this.state.ip,
            mac: this.state.mac,
            active: this.state.active,
            managementAttributes: this.state.managementAttributes
        };
        DeviceDataService.create(device)
            .then(response => {
                this.setState({
                    id: response.data.id, mode: "EDIT"
                });
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

    updateDevice() {
        let device = {
            name: this.state.name,
            type: this.state.type,
            ip: this.state.ip,
            mac: this.state.mac,
            active: this.state.active,
            managementAttributes: this.state.managementAttributes
        };
        DeviceDataService.update(this.state.id, device)
            .then(response => {
                NotificationManager.success(`Device ${this.state.id} successfully updated`)
            })
            .catch(error => {
                if (error.response) {
                    NotificationManager.error(`Error updating a device: ${error.response.data.message}`)
                } else {
                    NotificationManager.error(`Error updating a device: ${error}`)
                }
            });
    }

    renderStatusOptions(options) {
        return (<div className="form-group">
                <label htmlFor="status">Target Status</label>
                <select
                    className="form-control"
                    id="status"
                    required
                    value={this.state.managementAttributes.status}
                    onChange={this.onChangeStatus}
                    name="status"
                >
                    {options.map((state, i) => {
                        return (<option value={state} key={state}>{state}</option>)
                    })}
                </select>
            </div>)
    }

    renderStatusSelector() {
        switch (this.state.type) {
            case "BULB":
                return this.renderStatusOptions(BULB_STATES);
            case "RADIATOR":
                return this.renderStatusOptions(RADIATOR_STATES);
            case "TV":
                return this.renderStatusOptions(TV_STATES);
            case "FRIDGE":
                return this.renderStatusOptions(FRIDGE_STATES);
            case "KETTLE":
                return this.renderStatusOptions(KETTLE_STATES);
        }

        return null;
    }

    renderColorSelector() {
        if (this.state.type === "BULB") {
            return (<div className="form-group">
                    <label htmlFor="color">Target Status</label>
                    <select
                        className="form-control"
                        id="color"
                        required
                        value={this.state.managementAttributes.color}
                        onChange={this.onChangeColor}
                        name="color"
                    >
                        {BULB_COLORS.map((color, i) => {
                            return (<option value={color} key={color}>{color}</option>)
                        })}
                    </select>
                </div>)
        }
        return null
    }

    renderBrightnessSlider() {
        if (["BULB", "TV"].includes(this.state.type)) {
            return (<div className="form-group">
                    <label htmlFor="brightness">Target Brightness</label>
                    <input
                        type="range"
                        // className="form-control"
                        id="brightness"
                        required
                        value={this.state.managementAttributes.brightness}
                        min="1"
                        max="100"
                        onChange={this.onChangeBrightness}
                        name="brightness"
                    />
                </div>)
        }
        return null
    }

    renderTemperatureSlider() {
        if (["RADIATOR", "FRIDGE"].includes(this.state.type)) {
            return (<div className="form-group">
                    <label htmlFor="temperature">Target Temperature</label>
                    <input
                        type="range"
                        className="form-control"
                        id="temperature"
                        required
                        value={this.state.managementAttributes.temperature}
                        min="1"
                        max="100"
                        onChange={this.onChangeTemperature}
                        name="temperature"
                    />
                </div>)
        }
        return null
    }

    renderVolumeSlider() {
        if (this.state.type === "TV") {
            return (<div className="form-group">
                    <label htmlFor="volume">Target Volume</label>
                    <input
                        type="range"
                        className="form-control"
                        id="volume"
                        required
                        value={this.state.managementAttributes.volume}
                        min="1"
                        max="100"
                        onChange={this.onChangeVolume}
                        name="volume"
                    />
                </div>)
        }
        return null
    }

    renderHeaterTemperatureSlider() {
        if (this.state.type === "KETTLE") {
            return (<div className="form-group">
                    <label htmlFor="heater-temperature">Target Heater Temperature</label>
                    <input
                        type="range"
                        className="form-control"
                        id="heater-temperature"
                        required
                        value={this.state.managementAttributes.heaterTemperature}
                        min="1"
                        max="100"
                        onChange={this.onChangeHeaterTemperature}
                        name="heater-temperature"
                    />
                </div>)
        }
        return null
    }

    render() {
        return (<div className="submit-form">
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                            className="form-control"
                            id="type"
                            required
                            value={this.state.type}
                            onChange={this.onChangeType}
                            name="type"
                        >
                            <option value="BULB">BULB</option>
                            <option value="RADIATOR">RADIATOR</option>
                            <option value="TV">TV</option>
                            <option value="FRIDGE">FRIDGE</option>
                            <option value="KETTLE">KETTLE</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ip">IP</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ip"
                            required
                            value={this.state.ip}
                            onChange={this.onChangeIp}
                            name="ip"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mac">MAC</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mac"
                            required
                            value={this.state.mac}
                            onChange={this.onChangeMac}
                            name="mac"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="active">Active</label>
                        <input
                            type="checkbox"
                            // className="form-control"
                            id="active"
                            required
                            checked={this.state.active}
                            value={this.state.active}
                            onChange={this.onChangeActive}
                            name="active"
                        />
                    </div>

                    {this.renderStatusSelector()}
                    {this.renderColorSelector()}
                    {this.renderBrightnessSlider()}
                    {this.renderTemperatureSlider()}
                    {this.renderVolumeSlider()}
                    {this.renderHeaterTemperatureSlider()}

                    <button onClick={this.state.mode === "CREATE" ? this.createDevice : this.updateDevice}
                            className="btn btn-success">
                        {this.state.mode === "CREATE" ? (<p>Create</p>) : (<p>Update</p>)}
                    </button>
                </div>
            <NotificationContainer/>
            </div>);
    }
})