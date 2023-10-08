const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')

require("./configs/db")
require("dotenv").config()

const indexRouter = require('./routes/index');
const authUserRouter = require('./routes/authUser');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const eventRouter = require('./routes/event');
const guideRouter = require('./routes/guide');
const habitRouter = require('./routes/habits');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/auth/users', authUserRouter);
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/events', eventRouter);
app.use('/guides', guideRouter);
app.use("/habits", habitRouter)

const http = require("http")
const server = http.createServer(app)

// const moment = require('moment-timezone');
// const Habit = require("./models/Habit")

// function checkTime() {
//   const moscowTime = moment().tz('Europe/Moscow');
//   const currentTime = moscowTime.format('HH:mm');

//   if (currentTime === '12:00') {
//     let habits = Habit.find({}).exec()
//     habits.forEach(item => {
//         item.isDone = false
//         item.save()
//     })
//   }
// }

// setInterval(checkTime, 60000);

// server.listen(process.env.PORT || 3000, "192.168.0.101", () => console.log("сервер запущен 8000"))
server.listen(process.env.PORT || 8080, () => console.log("сервер запущен 8000"))   