const response = require('./response');

function errors(err, req, res, next) {
    console.error('[error from midleware errors]',err);
    const message = err.message || 'Internal error server';
    const status = err.statusCode || 500;

    response.error(req, res, message, status);
}

module.exports = errors;