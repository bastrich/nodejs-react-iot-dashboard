import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { DevicesList } from './components/devices-list.component.js'
import { AddDevice } from './components/add-device.component.js'
import { Device } from './components/device.component.js'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
class App extends Component {
  render() {
    return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/devices" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/devices"} className="nav-link">
              Devices
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path="/devices" element={<DevicesList />} />
          <Route exact path="/" element={<DevicesList />} />
          <Route exact path="/add" element={<AddDevice />} />
          <Route path="/devices/:id" element={<Device />} />
        </Routes>
      </div>
    </div>
    );
  }
}

export default App;
