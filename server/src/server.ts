import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as http from 'http';
//import MongoDBClient from './db/db';

import * as socket from './socket/socket';

const app = express();
const server = http.createServer(app);

// MONGO DB
// const mongoDB = new MongoDBClient().connectDB();

// SOCKET INITIALIZATION
socket.initialize(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build/public/')));
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

app.get('/', (req, res, next) => {
  res.sendFile('./public/index.html', {root: __dirname});
});

app.use('/auth', auth.router);

server.listen(8080, () => {
  console.log('Server listening on *:8080');
});