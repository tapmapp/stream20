const socket = require('./socket/socket')();
const auth = require('./auth/auth')(socket);

const boardSerialToken = '1234';
const secret = 'Password';

auth.authenticate(boardSerialToken, secret);