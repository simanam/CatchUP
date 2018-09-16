const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const logger = require('morgan');

const app = express();

app.use(cors());
const dbConfig = require('./config/secret');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use((req, res, next)  => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(cookieParser());
// app.use(logger('dev'));


mongoose.Promise = global.Promise;
mongoose.connect( 
    dbConfig.url,
     { useNewUrlParser: true });
    require('./socket/streams')(io);

const auth = require('./routes/authRoutes');
const posts = require('./routes/postRoutes');
const users = require('./routes/userRoutes');
const friends = require('./routes/friendsRoutes');
const message = require('./routes/messageRoutes');
app.use('/api/cotidienMe', auth);
app.use('/api/cotidienMe', posts);
app.use('/api/cotidienMe', users);
app.use('/api/cotidienMe', friends);
app.use('/api/cotidienMe', message);
server.listen(8000, () => {
    console.log('Running on port 8000')
})