import SocketIO from 'socket.io';

// INTERFACES
import { Server } from 'http';

var io: SocketIO.Server;
var watchers : string[] = [];

export const initialize = (server: Server): void => {
    io = SocketIO(server);
    io.on('connection', () => console.log('Socket Server initialized!'));
};

export const connect = (boardSerialToken: string): void => {
    if(watchers.indexOf(boardSerialToken) === -1) {
        watchers.push(boardSerialToken);
        var streamSocket = io.of(`/${boardSerialToken.toString()}`).on('connect', (socket) => {
            console.log('Socket connected!');
            //onFrameSocketEvent(socket, 'frame');


            socket.on('frame', data => {
                streamSocket.compress(true).emit('frame', data);
            });

            socket.on('environment', data => {
                streamSocket.emit('environment', data);
            });

            onDisconnectSocketEvent(socket, 'disconnect');
        });
    }
};

const onFrameSocketEvent = (socket, eventName): void => {
    socket.on(eventName, data => {
        socket.compress(true).volatile.emit(eventName, data);
    });
};

const onDisconnectSocketEvent = (socket, eventName): void => {
    socket.on(eventName, () => console.log(`Disconnecting... ${socket.id}`));
};

export const disconnect = (boardSerialToken) => {
    if(watchers.indexOf(boardSerialToken)) {
        watchers.splice(watchers.indexOf(boardSerialToken), 1);
    }
};
