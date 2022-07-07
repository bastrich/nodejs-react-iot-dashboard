//Imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/main");

//Configs
const PORT = process.env.PORT || 8080;
const FRONTEND_PORT = process.env.FRONTEND_PORT || 8081;
const CORS_OPTIONS = {
    origin: `http://localhost:${FRONTEND_PORT}`
};

//Init application
const app = express();

//Configure applications
app.use(cors(CORS_OPTIONS));
app.use(bodyParser.json());
router(app);

//Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});