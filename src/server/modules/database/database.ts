import { Sequelize } from 'sequelize';
import logger from '../utils/logger';
import { User } from './models/user';

const sequelize = new Sequelize({
  database: 'ugrp',
  username: 'root',
  password: '',
  dialect: 'mysql',
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
  user: User.init(sequelize),
};

Object.values(models)
  .filter((model: any) => typeof model.associate === 'function')
  .forEach((model: any) => model.associate(models));

sequelize.sync();

export default {
  ...models,
  sequelize,
};
