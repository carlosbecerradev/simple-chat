const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/simplechatdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( db => console.log('db is connected'))
.catch( err => console.log('dberr:', err));