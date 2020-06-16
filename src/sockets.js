const socketIO = require('socket.io');
const userDao = require('./dao/UserDao');

let usersConnected = [];

const connection = server => {
    const io = socketIO.listen(server);

    io.on('connection', socket => {
        console.log('New socket:', socket.id);

        socket.on('sign up', async (data, callbackFlag) => {
            console.log('socket-signUp:')
            let {email, nickname, password} = data;
            console.log(data)

            if(dataSignUpIsInvalid({email, nickname, password})) return callbackFlag(false);

            let user = await userDao.findUserByEmailAndNickname({email, nickname});
            console.log('user finded', user)

            if(user.length === 0){
                // user doesnt exists
                callbackFlag(true);
                await userDao.insertUser(data);
            } else {
                callbackFlag(false);
            }
        }); 

        function dataSignUpIsInvalid({email, nickname, password}){
            if(email === '' || nickname === '' || password === '') return true;
            
        }

        socket.on('sign in', async (data, callbackFlag) => {
            let { email, password } = data;

            let user = await userDao.findUserByEmailAndPassword({ email, password });
            console.log('socket-signIn:',user)
            if(user.length === 0){
                // user doesnt exists
                callbackFlag(false);
            } else {
                callbackFlag(true);
                socket.nickname = user[0].nickname;
                usersConnected.push(socket.nickname);
                updateUsersConnected();
            }

            socket.on('disconnect', data => {
                if(!socket.nickname) return;
                usersConnected.splice(usersConnected.indexOf(socket.nickname), 1);
                updateUsersConnected();
            });

            function updateUsersConnected(){
                io.sockets.emit('update users connected', usersConnected);
                socket.emit('user connected', socket.nickname);
            }

            socket.on('send message', message => {
                io.sockets.emit('new message', {
                    message: message,
                    nickname: socket.nickname
                });
            });

        });

    });
    
}

module.exports = { connection };