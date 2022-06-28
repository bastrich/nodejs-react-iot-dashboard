import React, { Component } from "react";
import DeviceDataService from "../services/device.service";
import { Link } from "react-router-dom";
export class DevicesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveDevices = this.retrieveDevices.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveDevice = this.setActiveDevice.bind(this);
        this.removeAllDevices = this.removeAllDevices.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.state = {
            devices: [],
            currentDevice: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }
    componentDidMount() {
        this.retrieveDevices();
    }
    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
        this.setState({
            searchTitle: searchTitle
        });
    }
    retrieveDevices() {
        DeviceDataService.getAll()
            .then(response => {
                this.setState({
                    devices: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    refreshList() {
        this.retrieveDevices();
        this.setState({
            currentDevice: null,
            currentIndex: -1
        });
    }
    setActiveDevice(device, index) {
        this.setState({
            currentDevice: device,
            currentIndex: index
        });
    }
    removeAllDevices() {
        DeviceDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }
    searchTitle() {
        DeviceDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    devices: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        const { searchTitle, devices, currentDevice, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Devices List</h4>
                    <ul className="list-group">
                        {devices &&
                            devices.map((device, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveDevice(device, index)}
                                    key={index}
                                >
                                    {device.title}
                                </li>
                            ))}
                    </ul>
                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllDevices}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentDevice ? (
                        <div>
                            <h4>Device</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentDevice.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentDevice.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentDevice.published ? "Published" : "Pending"}
                            </div>
                            <Link
                                to={"/devices/" + currentDevice.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Device...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}