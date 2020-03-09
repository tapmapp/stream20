import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';
import * as socket from './socket/socket';

const app = express();
const server = http.createServer(app);

// SOCKET INITIALIZATION
socket.initialize(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use((req, res, next) => {
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.sendStatus(200);
    }
    
    next();
    
});

// ROUTES
import * as auth from './auth/auth.routes';

app.use('/auth', auth.router);

server.listen(8080, () => {
  console.log('Server listening on *:8080');
});