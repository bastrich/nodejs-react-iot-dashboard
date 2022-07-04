import React from "react";
import {Link, useMatch} from "react-router-dom";
import {Routes} from 'react-router-dom'
import {Route} from 'react-router-dom'
import {DevicesList} from './components/devices-list.component.js'
import {default as AddEditDevice} from './components/add-edit-device.component.js'
import {Device} from './components/device.component.js'
import {About} from './components/about.component.js'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import {Stack} from "@mui/material";
import {Book, Pencil, Trash} from "react-bootstrap-icons";

function App() {
    // let isMainPage1 = useMatch("/devices")
    // let isMainPage2 = useMatch("/")
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
                                // '&:focus': {
                                //     textDecoration: 'none'
                                // },
                                '&:hover': {
                                    color: 'PaleGreen',
                                },
                                // '&:visited': {
                                //     textDecoration: 'none'
                                // },
                                // '&:link': {
                                //     textDecoration: 'none'
                                // },
                                // '&:active': {
                                //     textDecoration: 'none'
                                // }
                            }}
                        >
                            My Smart Home
                        </Typography>


                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Button
                                component={Link}
                                to={`/devices`}
                                key="All Devices"
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    backgroundColor: isMainPage ? 'DeepSkyBlue' : 'inherit',
                                    display: 'block',
                                    '&:hover': {
                                        backgroundColor: 'DeepSkyBlue',
                                        color: 'white',
                                    }
                                }}
                            >
                                All Devices
                            </Button>
                            <Button
                                component={Link}
                                to={`/devices/add`}
                                key="Add Device"
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    backgroundColor: isAddPage ? 'DeepSkyBlue' : 'inherit',
                                    display: 'block',
                                    '&:hover': {
                                        backgroundColor: 'DeepSkyBlue',
                                        color: 'white',
                                    }
                                }}
                            >
                                Add Device
                            </Button>
                            <Button
                                component={Link}
                                to={`/about`}
                                key="About"
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    backgroundColor: isAboutPage ? 'DeepSkyBlue' : 'inherit',
                                    display: 'block',
                                    '&:hover': {
                                        backgroundColor: 'DeepSkyBlue',
                                        color: 'white',
                                    }
                                }}
                            >
                                About
                            </Button>
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
        </Stack>
    );
}

export default App;
