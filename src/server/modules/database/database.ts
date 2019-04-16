import { Sequelize } from 'sequelize';
import logger from '../utils/logger';
import { User } from './models/user';

const sequelize = new Sequelize({
  database: 'ugmp',
  username: 'root',
  password: '',
  dialect: 'mysql',
  sync: { force: true },
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
});

sequelize.authenticate().then(() => {
  logger('RAGE', 'mysql', 'Connection established succesfully.', 'info');
}).catch((err) => {
  logger('RAGE', 'mysql', `Unable to connect to database: ${err}`, 'error');
});

const models = {
  user: User,
};

Object.values(models)
  .filter((model: any) => typeof model.associate === 'function')
  .forEach((model: any) => model.associate(models));

export default {
  ...models,
  sequelize,
};
