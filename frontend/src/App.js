import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { DevicesList } from './components/devices-list.component.js'
import { default as AddEditDevice } from './components/add-edit-device.component.js'
import { Device } from './components/device.component.js'
import { About } from './components/about.component.js'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
class App extends Component {
  render() {
    return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/devices" className="navbar-brand">
          My Smart Home
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/devices"} className="nav-link">
              All Devices
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Device
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/about"} className="nav-link">
              About
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path="/devices" element={<DevicesList />} />
          <Route exact path="/" element={<DevicesList />} />
          <Route exact path="/add" element={<AddEditDevice />} />
          <Route exact path="/devices/:id/edit" element={<AddEditDevice />} />
          <Route exact path="/devices/:id" element={<Device/>} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
    );
  }
}

export default App;
