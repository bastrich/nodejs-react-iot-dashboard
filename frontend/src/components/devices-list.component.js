//Renders Devices List page

import React, {useEffect, useState} from "react";
import DeviceDataService from "../services/device.service";
import {Link} from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    IconButton,
    Dialog,
    DialogTitle,
    DialogActions,
    Button
} from '@mui/material';
import {
    CheckCircleIcon,
    CancelIcon,
    PreviewIcon,
    EditIcon,
    DeleteIcon
} from '@mui/icons-material';
import {NotificationManager} from 'react-notifications';

const DevicesList = () => {
    const [devices, setDevices] = useState([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
    const [deletingId, setDeletingId] = React.useState(null);

    useEffect(() => {
        retrieveDevices();
    }, []);

    const retrieveDevices = () => {
        DeviceDataService.getAll()
            .then(response => {
                setDevices(response.data.devices);
            })
            .catch(error => {
                NotificationManager.error(`${error}`, "Error obtaining devices");
            });
    };

    const deleteDevice = (deviceId) => {
        DeviceDataService.delete(deviceId)
            .then(response => {
                NotificationManager.success(`Successfully deleted device ${deviceId}`);
                retrieveDevices();
            })
            .catch(error => {
                 NotificationManager.error(`${error}`, `Error deleting device ${deviceId}`);
            });
    };

    const onClickDelete = (deviceId) => {
        setDeletingId(deviceId);
        setDeleteConfirmationOpen(true);
    };

    const onClickDeleteConfirm = () => {
        deleteDevice(deletingId);
        setDeleteConfirmationOpen(false);
    };

    const onClickDeleteCancel = () => {
        setDeleteConfirmationOpen(false);
    };

    return (
        <Container maxWidth="md">
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
                                <TableCell align="right">
                                    {device.active ? <CheckCircleIcon sx={{color: "green"}}/> : <CancelIcon sx={{color: "red"}}/>}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        component={Link}
                                        to={`/devices/${device.id}`}
                                        sx={{
                                            color: "DarkSlateGray",
                                            '&:hover': {color: 'PeachPuff'}
                                        }}
                                    >
                                        <PreviewIcon/>
                                    </IconButton>
                                    <IconButton
                                        component={Link}
                                        to={`/devices/${device.id}/edit`}
                                        sx={{
                                            color: "DarkSlateGray",
                                            '&:hover': {color: 'CornflowerBlue'}
                                        }}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => onClickDelete(device.id)}
                                        sx={{
                                            color: "DarkSlateGray",
                                            '&:hover': {color: 'red'}
                                        }}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={deleteConfirmationOpen}
                onClose={onClickDeleteCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Do you want to delete device {deletingId}?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={onClickDeleteConfirm}>Agree</Button>
                    <Button onClick={onClickDeleteCancel} autoFocus>Disagree</Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
};

export default DevicesList;