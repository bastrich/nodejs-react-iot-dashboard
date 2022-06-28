import React, { Component } from "react";
import DeviceDataService from "../services/device.service";
export class Device extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getDevice = this.getDevice.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateDevice = this.updateDevice.bind(this);
        this.deleteDevice = this.deleteDevice.bind(this);
        this.state = {
            currentDevice: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        };
    }
    componentDidMount() {
        this.getDevice(this.props.match.params.id);
    }
    onChangeTitle(e) {
        const title = e.target.value;
        this.setState(function(prevState) {
            return {
                currentDevice: {
                    ...prevState.currentDevice,
                    title: title
                }
            };
        });
    }
    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentDevice: {
                ...prevState.currentDevice,
                description: description
            }
        }));
    }
    getDevice(id) {
        DeviceDataService.get(id)
            .then(response => {
                this.setState({
                    currentTDevice: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    updatePublished(status) {
        var data = {
            id: this.state.currentDevice.id,
            title: this.state.currentDevice.title,
            description: this.state.currentDevice.description,
            published: status
        };
        DeviceDataService.update(this.state.currentDevice.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentDevice: {
                        ...prevState.currentDevice,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    updateDevice() {
        DeviceDataService.update(
            this.state.currentDevice.id,
            this.state.currentDevice
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The device was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    deleteDevice() {
        DeviceDataService.delete(this.state.currentDevice.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/devices')
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        const { currentDevice } = this.state;
        return (
            <div>
                {currentDevice ? (
                    <div className="edit-form">
                        <h4>Device</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentDevice.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentDevice.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentDevice.published ? "Published" : "Pending"}
                            </div>
                        </form>
                        {currentDevice.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}
                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteDevice}
                        >
                            Delete
                        </button>
                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateDevice}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Device...</p>
                    </div>
                )}
            </div>
        );
    }
}