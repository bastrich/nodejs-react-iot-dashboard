import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import DeviceDataService from "../services/device.service";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Book, Pencil, Trash} from "react-bootstrap-icons";
import TableContainer from "@mui/material/TableContainer";
import {Divider} from "@mui/material";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Device = () => {
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [ip, setIp] = useState("")
    const [mac, setMac] = useState("")
    const [active, setActive] = useState(null)
    const [managementAttributes, setManagementAttributes] = useState({})
    const [monitoringAttributes, setMonitoringAttributes] = useState({})

    useEffect(() => {
        getDevice(id);
    }, [id]);

    const getDevice = () => {
        DeviceDataService.getById(id)
            .then(response => {
                setId(response.data.id)
                setName(response.data.name)
                setType(response.data.type)
                setIp(response.data.ip)
                setMac(response.data.mac)
                setActive(response.data.active)
                setManagementAttributes(response.data.managementAttributes)
                setMonitoringAttributes(response.data.monitoringAttributes)
            })
            .catch(e => {

            });
    };

    const renderAttributeRow = (attributeName, attributeValue) => {
        return (
            <TableRow
                hover
                // key={attributeName}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell component="th" scope="row" sx={{'borderRight': '5px solid red'}}>{attributeName}: </TableCell>
                <TableCell align="right">{attributeValue}</TableCell>
            </TableRow>
        )
    }

    const renderManagementAttributes = () => {
        switch (type) {
            case "BULB":
                return (
                    <React.Fragment>
                        {renderAttributeRow("Status", managementAttributes.status)}
                        {renderAttributeRow("Color", managementAttributes.color)}
                        {renderAttributeRow("Brightness", managementAttributes.brightness)}
                    </React.Fragment>
                )
            case "RADIATOR":
                return (
                    <React.Fragment>
                        {renderAttributeRow("Status", managementAttributes.status)}
                        {renderAttributeRow("Temperature", managementAttributes.temperature)}
                    </React.Fragment>
                )
            case "TV":
                return (
                    <React.Fragment>
                        {renderAttributeRow("Status", managementAttributes.status)}
                        {renderAttributeRow("Brightness", managementAttributes.brightness)}
                        {renderAttributeRow("Volume", managementAttributes.volume)}
                    </React.Fragment>
                )
            case "FRIDGE":
                return (
                    <React.Fragment>
                        {renderAttributeRow("Status", managementAttributes.status)}
                        {renderAttributeRow("Temperature", managementAttributes.temperature)}
                    </React.Fragment>
                )
            case "KETTLE":
                return (
                    <React.Fragment>
                        {renderAttributeRow("Status", managementAttributes.status)}
                        {renderAttributeRow("Heater Temperature", managementAttributes.heaterTemperature)}
                    </React.Fragment>
                )
        }
    }

    const renderMonitoringAttributes = () => {
        switch (type) {
            case "BULB":
                return (
                    <React.Fragment>
                        {renderAttributeRow("Status", monitoringAttributes.status)}
                        {renderAttributeRow("Color", monitoringAttributes.color)}
                        {renderAttributeRow("Brightness", monitoringAttributes.brightness)}
                        {renderAttributeRow("Temperature", monitoringAttributes.temperature)}
                    </React.Fragment>
                )
            case "RADIATOR":
                return (
                    <React.Fragment>
                        {renderAttributeRow("Status", monitoringAttributes.status)}
                        {renderAttributeRow("Temperature", monitoringAttributes.temperature)}
                    </React.Fragment>
                )
            case "TV":
                return (
                    <React.Fragment>
                        {renderAttributeRow("Status", monitoringAttributes.status)}
                        {renderAttributeRow("Brightness", monitoringAttributes.brightness)}
                        {renderAttributeRow("Volume", monitoringAttributes.volume)}
                    </React.Fragment>
                )
            case "FRIDGE":
                return (
                    <React.Fragment>
                        {renderAttributeRow("Status", monitoringAttributes.status)}
                        {renderAttributeRow("Temperature", monitoringAttributes.temperature)}
                    </React.Fragment>
                )
            case "KETTLE":
                return (
                    <React.Fragment>
                        {renderAttributeRow("Status", monitoringAttributes.status)}
                        {renderAttributeRow("Heater Temperature", monitoringAttributes.heaterTemperature)}
                        {renderAttributeRow("Water Temperature", monitoringAttributes.waterTemperature)}
                    </React.Fragment>
                )
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableBody>
                    {renderAttributeRow("ID", id)}
                    {renderAttributeRow("Name", name)}
                    {renderAttributeRow("Type", type)}
                    {renderAttributeRow("IP", ip)}
                    {renderAttributeRow("MAC", mac)}
                    {renderAttributeRow("Active", active ? <CheckCircleIcon/> : <CancelIcon/>)}

                    <TableRow
                        hover
                        key="target-status"
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell align="right">Target State:</TableCell>
                    </TableRow>
                    {renderManagementAttributes()}

                    <TableRow
                        hover
                        key="current-state"
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell align="right">Current State:</TableCell>
                    </TableRow>
                    {renderMonitoringAttributes()}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Device