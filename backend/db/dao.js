const dbConfigs = require('./config')
const {Pool} = require('pg')
const pool = new Pool({
    host: dbConfigs.HOST,
    port: dbConfigs.PORT,
    user: dbConfigs.USER,
    password: dbConfigs.PASSWORD,
    database: dbConfigs.DB,
})
pool.connect()

exports.add = (device) => new Promise((resolve, reject) => {
    pool.query(
        'INSERT INTO devices (name, type, ip, mac, active, attributes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [device.name, device.type, device.ip, device.mac, device.active, device.attributes],
        (error, results) => {
            if (error) {
                reject(error)
                return
            }
            resolve(results.rows[0].id)
            return
            // response.status(201).send(`User added with ID: ${results.rows[0].id}`)
        }
    )
});

exports.getAll = () => new Promise((resolve, reject) => {
    pool.query(
        'SELECT id, name, type, ip, mac, active, attributes FROM devices ORDER BY id ASC',
        (error, results) => {
            if (error) {
                reject(error)
                return
            }
            if (results) {
                resolve(results.rows)
                return
            }
            resolve([])
            return

            // response.status(200).json(results.rows)
        }
    )
});

