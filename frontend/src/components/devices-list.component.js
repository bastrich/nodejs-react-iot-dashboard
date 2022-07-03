import React, {Component} from "react";
import DeviceDataService from "../services/device.service";
import {Link} from "react-router-dom";
import {CheckCircle, XCircle, Book, Pencil, Trash} from 'react-bootstrap-icons'

export class DevicesList extends Component {
    constructor(props) {
        super(props);
        this.retrieveDevices = this.retrieveDevices.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveDevice = this.setActiveDevice.bind(this);
        this.deleteDevice = this.deleteDevice.bind(this);
        this.state = {
            devices: [],
            currentDevice: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveDevices();
    }

    retrieveDevices() {
        DeviceDataService.getAll()
            .then(response => {
                this.setState({
                    devices: response.data.devices
                });
                console.log(response.data.devices);
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

    deleteDevice(deviceId) {
        DeviceDataService.delete(deviceId)
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {devices, currentDevice, currentIndex} = this.state;
        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Devices List</h4>

                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">IP</th>
                            <th scope="col">MAC</th>
                            <th scope="col">Active</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>

                        {devices &&
                            devices.map((device, index) => (

                                <tr
                                    // className={
                                    //     "list-group-item " +
                                    //     (index === currentIndex ? "active" : "")
                                    // }
                                    onClick={() => this.setActiveDevice(device, index)}
                                    key={index}
                                >
                                    <th scope="row">{device.id}</th>
                                    <td>{device.name}</td>
                                    <td>{device.type}</td>
                                    <td>{device.ip}</td>
                                    <td>{device.mac}</td>
                                    <td>{device.active ? (<CheckCircle/>) : (<XCircle/>)}</td>
                                    <td>
                                        <Link to={`/devices/${device.id}`}>
                                            <Book/>
                                        </Link>
                                        <Link to={`/devices/${device.id}/edit`}>
                                            <Pencil/>
                                        </Link>
                                        <Trash onClick={() => this.deleteDevice(device.id)}/>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}