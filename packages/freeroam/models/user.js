'use strict';

const logger = require('../modules/utils/logger');

module.exports = (sequelize, DataTypes) => {
    let user = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        admin: DataTypes.INTEGER,
        position: DataTypes.STRING
    });

    user.associate = (models) => {};

    user.sync().then(() => {
        logger('RAGE', 'database', 'Table (user) has been synced.', 'info');
    });

    return user;
}