import knex from 'knex'
import config from '../config/config'
const connection  = knex({
    client:'pg',
    connection: {
      host: config.DB_HOST,
        user: config.DB_USER,
        password:config.DB_PASSWORD,
        database: config.DB_DATABASE,
        port:config.DB_PORT
      }
})

export default connection;