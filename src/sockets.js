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

            if(dataSignUpIsInvalid({ email, nickname, password })) return callbackFlag(false);

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

        function dataSignUpIsInvalid({ email, nickname, password }){
            if(email === '' || nickname === '' || password === '') return true;            
        }


        socket.on('sign in', async (data, callbackFlag) => {
            console.log('socket-signIn:')
            let { email, password } = data;

            if(dataSignInIsInvalid({ email, password })) return callbackFlag(false);

            let user = await userDao.findUserByEmailAndPassword({ email, password });
            console.log(user)
            if(user.length === 0){
                // user doesnt exists
                callbackFlag(false);
            } else {
                callbackFlag(true);
                socket.nickname = user[0].nickname;
                usersConnected.push(socket.nickname);
                updateUsersConnected();
            }

        });

        function dataSignInIsInvalid({ email, password }){
            if(email === ''  || password === '') return true;            
        }       


        socket.on('user typing', ({ nickname, key, inputEmpty }) => {
            // console.log(nickname, key, inputEmpty)
            socket.broadcast.emit('user typing', { nickname, key, inputEmpty });
        });


        socket.on('send message', message => {
            message = message.trim();
            if(message !== ''){
                io.sockets.emit('new message', {
                    message: message,
                    nickname: socket.nickname
                });
            }            
        });


        socket.on('disconnect', data => {
            if(!socket.nickname) return;
            usersConnected.splice(usersConnected.indexOf(socket.nickname), 1);
            updateUsersConnected();
        }); 

        function updateUsersConnected(){
            io.sockets.emit('update users connected', usersConnected);
            socket.emit('user connected', socket.nickname);
        }
        
    });
    
}

module.exports = { connection };