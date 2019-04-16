import glob from 'glob';
import path from 'path';
import { Sequelize } from 'sequelize';
import logger from '../utils/logger';

const db: any = {};
const connection = new Sequelize('ragemp', 'ragemp', '#1234qwe', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
});

db.connection = connection;
db.Sequelize = Sequelize;

// connection.authenticate()
//   .then(() => logger('RAGE', 'database', 'Connection to the database has been established.', 'info'))
//   .catch((err: string) => logger('RAGE', 'database', `Unable to connect to database. (Error: ${err})`, 'error'));

glob.sync('./packages/server/modules/database/models/*.js').forEach((filename: string) => {
  const f = path.parse(filename);
  db[f.name.toLowerCase()] = connection['import'](path.join(__dirname, './models', f.name));
  console.log(path.join(__dirname, './models', f.name));
});

// let tableString;

// Object.keys(db).forEach(name => {
// tableString += db[name];
// if(db[name].associate) {
// db[name].associate(db);
// }
// });

export default db;
