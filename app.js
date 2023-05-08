const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')
require("./configs/db")
require("dotenv").config()

const indexRouter = require('./routes/index');
const gettersRouter = require('./routes/getters');
const settersRouter = require('./routes/setters');
const advertisementsRouter = require('./routes/advertisements');
const authSetterRouter = require('./routes/authSetter');
const authGetterRouter = require('./routes/authGetter');

const app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/getters', gettersRouter);
app.use('/setters', settersRouter);
app.use('/advertisements', advertisementsRouter);
app.use('/auth/getter', authGetterRouter);
app.use('/auth/setter', authSetterRouter);

// app.listen(process.env.PORT || 36304,  '192.168.0.101', () => console.log("сервер запущен 8000"))
app.listen(process.env.PORT || 3000, () => console.log("сервер запущен 8000"))