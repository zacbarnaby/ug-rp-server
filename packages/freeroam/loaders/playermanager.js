'use strict';

const logger = require('../modules/utils/logger');

module.exports = async() => {
    try {
        require('../modules/player/playerManager');
        logger('RAGE', 'modules', `Player manager loaded succesfully.`, 'info');
    } catch(err) {
        logger('RAGE', 'modules', `Error while loading player manager. (Error: ${err.message} / ${err.stack}).`, 'error');
    }
};