require('ts-node/register');

const development= {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  seederStorage: 'sequelize',
  dialect: process.env.DB_DIALECT
}

const test = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    seederStorage: 'sequelize',
    dialectOptions: {
        ssl: {
            require: true,
        rejectUnauthorized: false, // Required for Neon or some managed PG services
    }
  },
}

const production = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    seederStorage: 'sequelize'
}

module.exports = {
    
    production,
    test,
    development
  
};