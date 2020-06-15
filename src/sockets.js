const socketIO = require('socket.io');
const userDao = require('./dao/UserDao');

const connection = server => {
    const io = socketIO.listen(server);

    io.on('connection', socket => {
        console.log('New socket:', socket.id);

        socket.on('sign up', async (data, callbackFlag) => {
            let {email, nickname, password} = data;
            
            let user = await userDao.findUserByEmailAndNickname({email, nickname});
            console.log('socket-signUp:',user)
            if(user.length === 0){
                // user doesnt exists
                callbackFlag(true);
                await userDao.insertUser(data);
            } else {
                callbackFlag(false);
            }
        }); 


        socket.on('sign in', async (data, callbackFlag) => {
            let { email, password } = data;

            let user = await userDao.findUserByEmailAndPassword({ email, password });
            console.log('socket-signIn:',user)
            if(user.length === 0){
                // user doesnt exists
                callbackFlag(false);
            } else {
                callbackFlag(true);
            }

        });

    });
    
}

module.exports = { connection };