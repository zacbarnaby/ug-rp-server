const db = {};
const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const glob = require('glob');
const path = require('path');

let tableString;

const dbConnection = new Sequelize('ragemp', 'ragemp', '#1234qwe', {
    host: 'localhost', 
    dialect: 'mysql',
    pool: {
        max: 5, 
        min: 0, 
        acquire: 30000,
        idle: 10000
    }
});

dbConnection
    .authenticate()
    .then(() => {
        logger('RAGE', 'database', `Connection to the database has been established.`, 'info');
    })
    .catch((err) => {
        logger('RAGE', 'database', `Unable to connect to database. (Error: ${err})`, 'error');
    });

glob.sync('./packages/freeroam/models/*.js').forEach((f) => {
    f = path.parse(f);
    db[f.name.toLowerCase()] = dbConnection['import'](path.join(__dirname, '../../models', f.name));
    console.log(path.join(__dirname, '../../models', f.name));
});

Object.keys(db).forEach(name => {
    tableString += db[name];
    if(db[name].associate) {
        db[name].associate(db);
    }
});

db.connection = dbConnection;
db.Sequelize = Sequelize;

module.exports = db;
