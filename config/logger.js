const {
    createLogger,
    transport,
    format,
    transports
} = require('winston');

const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'logs.txt',
            level: 'info',
            format: format.combine(format.timestamp(), format.simple())
        })
    ]
})

module.exports = logger;