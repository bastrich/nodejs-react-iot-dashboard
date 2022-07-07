import React  from "react";
import Paper from "@mui/material/Paper";
import {Container} from "@mui/material";

const About = () => {
    return (
        <Container maxWidth="sm">
            <Paper sx={{padding: 1, backgroundColor: "DeepSkyBlue"}}>
                The Web Dashboard "MY SMART HOME" allows you to manage devices from the smart home eco-system
                including adding, editing, monitoring and deleting them.
            </Paper>
            <Paper sx={{my: 2, padding: 1, backgroundColor: "DeepSkyBlue"}}>
                Developer: Daniil Bastrich
            </Paper>
        </Container>
    )
}

export default About