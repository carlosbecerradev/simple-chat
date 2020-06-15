const User = require('../models/User');

const insertUser = async ({ email, nickname, password }) => {
    await User.create({
        email, 
        nickname, 
        password
    });
}

const findUserByEmailAndNickname = async ({ email , nickname }) => {
    return await User.find({
        $or: [ {email}, {nickname}]
    });
}

const findUserByEmailAndPassword = async ({ email, password }) => {
    return await User.find( {email, password} );
}

module.exports = {
    insertUser,
    findUserByEmailAndNickname,
    findUserByEmailAndPassword
}