'use strict';

const logger = require('../modules/utils/logger');

module.exports = async() => {
    try {
        require('../modules/events/events');
        logger('RAGE', 'modules', `Events loaded succesfully.`, 'info');
    } catch(err) {
        logger('RAGE', 'modules', `Error while loading events. (Error: ${err.message} / ${err.stack}).`, 'error');
    }
};