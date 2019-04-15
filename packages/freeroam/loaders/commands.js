'use strict';

const logger = require('../modules/utils/logger');

module.exports = async() => {
    try {
        require('../modules/commands');
        logger('RAGE', 'modules', `Commands loaded succesfully.`, 'info');
    } catch(err) {
        logger('RAGE', 'modules', `Error while loading commands. (Error: ${err.message} / ${err.stack}).`, 'error');
    }
};