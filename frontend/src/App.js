//Render Navigation menu and parent container for other pages

import React from "react";
import {Link, Route, Routes, useMatch} from "react-router-dom";
import DevicesList from './components/devices-list.component'
import AddEditDevice from './components/add-edit-device.component'
import Device from './components/device.component'
import About from './components/about.component'
import "bootstrap/dist/css/bootstrap.min.css";

import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import {AppBar, Box, Toolbar, Typography, Container, Button, Stack} from "@mui/material";
import {NotificationContainer} from "react-notifications";

const MenuButton = (props) => {
    return (
        <Button
            component={Link}
            to={props.link}
            key={props.text}
            sx={{
                my: 2,
                color: 'white',
                backgroundColor: props.isSelected ? 'DeepSkyBlue' : 'inherit',
                display: 'block',
                '&:hover': {
                    backgroundColor: 'DeepSkyBlue',
                    color: 'white',
                }
            }}
        >
            {props.text}
        </Button>
    )
}

const App = () => {
    const isMainPage = !!useMatch("/") | !!useMatch("/devices")
    const isAddPage = useMatch("/devices/add")
    const isAboutPage = useMatch("/about")

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
                            <MenuButton text="All Devices" link="/devices" isSelected={isMainPage}/>
                            <MenuButton text="Add Device" link="/devices/add" isSelected={isAddPage}/>
                            <MenuButton text="About" link="/about" isSelected={isAboutPage}/>
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

export default App;
