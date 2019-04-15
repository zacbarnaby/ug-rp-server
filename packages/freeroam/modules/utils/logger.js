const log4js = require('log4js');

log4js.configure({
    appenders: {
        file: { type: 'file', layout: { type: 'basic' }, filename: `logs/rage.log` },
        console: { type: 'console' }
    },
    categories: { default: { appenders: ['file', 'console'], level: 'info' } }
});

module.exports = (logName, moduleName, msg, type) => log4js.getLogger(logName)[type](`[${moduleName}] ${msg}`);