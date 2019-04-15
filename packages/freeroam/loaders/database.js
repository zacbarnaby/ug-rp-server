'use strict';

const logger = require('../modules/utils/logger');

module.exports = async() => {
    try {
        require('../modules/database/database');
        logger('RAGE', 'modules', `Database loaded succesfully.`, 'info');
    } catch(err) {
        logger('RAGE', 'modules', `Error while loading database. (Error: ${err.message} / ${err.stack}).`, 'error');
    }
};