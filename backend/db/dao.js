//Data Access Object Module

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
        'INSERT INTO devices (name, type, ip, mac, active, management_attributes, monitoring_attributes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        [
            device.name,
            device.type,
            device.ip,
            device.mac,
            device.active,
            device.managementAttributes,
            device.monitoring_attributes
        ],
        (error, result) => {
            if (error) {
                reject(error)
                return
            }
            resolve(result.rows[0].id)
        }
    )
});

exports.getAll = () => new Promise((resolve, reject) => {
    pool.query(
        'SELECT id, name, type, ip, mac, active, management_attributes, monitoring_attributes FROM devices ORDER BY id ASC',
        (error, result) => {
            if (error) {
                reject(error)
                return
            }
            if (result) {
                resolve(result.rows.map((row) => {
                    row.managementAttributes = row.management_attributes
                    row.monitoringAttributes = row.monitoring_attributes
                    delete row.management_attributes
                    delete row.monitoring_attributes
                    return row
                }))
                return
            }
            resolve([])
        }
    )
});

exports.getById = (deviceId) => new Promise((resolve, reject) => {
    pool.query(
        'SELECT id, name, type, ip, mac, active, management_attributes, monitoring_attributes FROM devices WHERE id = $1',
        [deviceId],
        (error, result) => {
            if (error) {
                reject(error)
                return
            }
            if (result && result.rows.length > 0) {
                const device = result.rows[0]
                device.managementAttributes = device.management_attributes
                device.monitoringAttributes = device.monitoring_attributes
                delete device.management_attributes
                delete device.monitoring_attributes
                resolve(device)
                return
            }
            resolve(null)
        }
    )
});

exports.update = (deviceId, device) => new Promise((resolve, reject) => {
    pool.query(
        'UPDATE devices SET name = $2, type = $3, ip = $4, mac = $5, active = $6, management_attributes=$7 WHERE id = $1',
        [
            deviceId,
            device.name,
            device.type,
            device.ip,
            device.mac,
            device.active,
            device.managementAttributes
        ],
        (error, result) => {
            if (error) {
                reject(error)
                return
            }
            resolve(result.rowCount)
        }
    )
});

exports.delete = (deviceId) => new Promise((resolve, reject) => {
    pool.query(
        'DELETE FROM devices WHERE id = $1',
        [deviceId],
        (error, result) => {
            if (error) {
                reject(error)
                return
            }
            resolve(result.rowCount)
            return
        }
    )
});
