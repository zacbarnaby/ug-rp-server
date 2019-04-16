import * as Sequelize from 'sequelize';
// import logger from '../modules/utils/logger';

export default (sequelize: Sequelize.Sequelize, dataTypes: any) => {
  const user = sequelize.define('user', {
    username: dataTypes.STRING,
    password: dataTypes.STRING,
    admin: dataTypes.INTEGER,
    position: dataTypes.STRING,
  });

  // user.associate = (models) => {};

  // user.sync().then(() => {
  //  logger('RAGE', 'database', 'Table (user) has been synced.', 'info');
  // });

  return user;
};
