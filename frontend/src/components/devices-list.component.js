import React, {useEffect, useState} from "react";
import DeviceDataService from "../services/device.service";
import {Link} from "react-router-dom";
import {CheckCircle, XCircle, Book, Pencil, Trash} from 'react-bootstrap-icons'

// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Container} from "@mui/material";

export const DevicesList = () => {
    const [devices, setDevices] = useState([])

    useEffect(() => {
        retrieveDevices();
    }, []);

    const retrieveDevices = () => {
        DeviceDataService.getAll()
            .then(response => {
                setDevices(response.data.devices)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const deleteDevice = (deviceId) => {
        DeviceDataService.delete(deviceId)
            .then(response => {
                retrieveDevices();
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">IP</TableCell>
                        <TableCell align="right">MAC</TableCell>
                        <TableCell align="right">Active</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {devices.map((device) => (
                        <TableRow
                            hover
                            key={device.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {device.id}
                            </TableCell>
                            <TableCell align="right">{device.name}</TableCell>
                            <TableCell align="right">{device.type}</TableCell>
                            <TableCell align="right">{device.ip}</TableCell>
                            <TableCell align="right">{device.mac}</TableCell>
                            <TableCell align="right">{device.active}</TableCell>
                            <TableCell align="right">
                                <Link to={`/devices/${device.id}`}>
                                    <Book/>
                                </Link>
                                <Link to={`/devices/${device.id}/edit`}>
                                    <Pencil/>
                                </Link>
                                <Trash onClick={() => deleteDevice(device.id)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}