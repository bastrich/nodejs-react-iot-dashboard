import React from "react";
import {Link, Route, Routes, useMatch} from "react-router-dom";
import DevicesList from './components/devices-list.component'
import AddEditDevice from './components/add-edit-device.component'
import Device from './components/device.component'
import About from './components/about.component'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Stack} from "@mui/material";
import {NotificationContainer} from "react-notifications";

export const App = () => {
    const isMainPage = !!useMatch("/") | !!useMatch("/devices")
    const isAddPage = useMatch("/devices/add")
    const isAboutPage = useMatch("/about")

    const renderMenuButton = (text, link, isSelected) => {
        return (
            <Button
                component={Link}
                to={link}
                key={text}
                sx={{
                    my: 2,
                    color: 'white',
                    backgroundColor: isSelected ? 'DeepSkyBlue' : 'inherit',
                    display: 'block',
                    '&:hover': {
                        backgroundColor: 'DeepSkyBlue',
                        color: 'white',
                    }
                }}
            >
                {text}
            </Button>
        )
    }

    return (
        <Stack alignItems={"center"} justifyContent={"center"} spacing={2}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <OnlinePredictionIcon sx={{mr: 1, color: "GreenYellow"}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'LightGreen',
                                textDecoration: 'none',
                                '&:hover': {
                                    color: 'PaleGreen',
                                }
                            }}
                        >
                            MY SMART HOME
                        </Typography>


                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {renderMenuButton("All Devices", "/devices", isMainPage)}
                            {renderMenuButton("Add Device", "/devices/add", isAddPage)}
                            {renderMenuButton("About", "/about", isAboutPage)}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container>
                <Routes>
                    <Route exact path="/devices" element={<DevicesList/>}/>
                    <Route exact path="/" element={<DevicesList/>}/>
                    <Route exact path="/devices/add" element={<AddEditDevice/>}/>
                    <Route exact path="/devices/:id/edit" element={<AddEditDevice/>}/>
                    <Route exact path="/devices/:id" element={<Device/>}/>
                    <Route exact path="/about" element={<About/>}/>
                </Routes>
            </Container>
            <NotificationContainer/>
        </Stack>
    );
}
