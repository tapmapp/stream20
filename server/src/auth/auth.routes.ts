import express from 'express';
import * as socket from '../socket/socket';
import * as auth from './auth';

export const router = express.Router();

router.post('/connect/farm', async (req, res, next) => {

    const boardSerialToken = req.body.boardSerialToken;
    const boardPassword = req.body.boardPassword;

    auth.authenticateBoard(boardSerialToken, boardPassword).then(() => {
        socket.connect(boardSerialToken);
    });

    // RESPONSE
    res.json(`Socket connected on path ${boardSerialToken}!`);

});

router.post('/disconnect/farm', async (req, res) => {

    const boardSerialToken = req.body.boardSerialToken;

    try {
        
        await socket.disconnect(boardSerialToken);
        console.log('disconnected!');

        // RESPONSE
        res.sendStatus(200);

    } catch(err) {
        
        console.log(err);

        // RESPONSE
        res.sendStatus(400);
        
    }

});