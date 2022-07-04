import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import DeviceDataService from "../services/device.service";

export const Device = () => {
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [ip, setIp] = useState("")
    const [mac, setMac] = useState("")
    const [managementAttributes, setManagementAttributes] = useState({})
    const [monitoringAttributes, setMonitoringAttributes] = useState({})

    useEffect(() => {
        getDevice(id);
    });

    const getDevice = () => {
        DeviceDataService.getById(id)
            .then(response => {
                setId(response.data.id)
                setName(response.data.name)
                setType(response.data.type)
                setIp(response.data.ip)
                setMac(response.data.mac)
                setManagementAttributes(response.data.managementAttributes)
                setMonitoringAttributes(response.data.monitoringAttributes)
            })
            .catch(e => {

            });
    };

    const renderManagementAttributes = () => {
        switch (type) {
            case "BULB":
                return (<div>Brightness: {managementAttributes.brightness} </div>)
        }
    }

    return (
        <div>
            <div> Id: <p>{id}</p> </div>
            <div> Name: <p>{name}</p> </div>
            <div> Type: <p>{type}</p> </div>
            <div> IP: <p>{ip}</p> </div>
            <div> MAC: <p>{mac}</p> </div>
            <div> Target state: <p>{renderManagementAttributes()}</p> </div>
            {/*<div> Current state: <p>{monitoringAttributes}</p> </div>*/}
        </div>
    )
}