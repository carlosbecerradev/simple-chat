const socketIO = require('socket.io');

const connection = server => {
    const io = socketIO.listen(server);

    io.on('connection', socket => {
        console.log('New socket:', socket.id);
    });
    
}

module.exports = { connection };