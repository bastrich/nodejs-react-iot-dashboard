module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    PORT: process.env.DB_PORT || "5432",
    USER: process.env.DB_USER || "smarthome",
    PASSWORD: process.env.DB_PASSWORD || "smarthome",
    DB: process.env.DB_NAME || "smarthome"
};