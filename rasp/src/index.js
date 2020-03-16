const socket = require('./socket/socket')();
const auth = require('./auth/auth')(socket);

// ENVIRONMENT
const Env = require('./env/env');

auth.authenticate(Env.boardSerialToken, Env.boardPassword);