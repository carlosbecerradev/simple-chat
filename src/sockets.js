const socketIO = require('socket.io');
const userDao = require('./dao/UserDao');

const connection = server => {
    const io = socketIO.listen(server);

    io.on('connection', socket => {
        console.log('New socket:', socket.id);

        socket.on('sign up', async (data, callbackFlag) => {
            let {email, nickname, password} = data;
            
            let findUser = await userDao.findUserByEmailAndNickname({email, nickname});
            console.log('socket-signUp:',findUser)
            if(findUser.length === 0){
                // user doesnt exists
                callbackFlag(true);
                await userDao.insertUser(data);
            } else {
                callbackFlag(false);
            }
        })

    });
    
}

module.exports = { connection };