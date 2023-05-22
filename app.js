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
const notificationsRouter = require('./routes/notifications');

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
app.use("/notifications", notificationsRouter)

const http = require("http")
const server = http.createServer(app)

const { Server } = require("socket.io");
const Chat = require('./models/Chat');
const Message = require('./models/Message');
const Getter = require('./models/Getter');
const Setter = require('./models/Setter');

const io = new Server(server)
io.on("connection", socket => {
    console.log("connected!");
    
    socket.on("create_chat", data => {
        Chat.findOne({ users: data }).then(chat => {
            if (chat != null) io.emit("getCreatedChat", chat)
            else {
                Getter.findById(data[1]).then(user => {
                    let title = "Новый чат"
                    if (user != null) title = user.login
                    Chat.create({ title: title, users: data }).then(result => io.emit("getCreatedChat", result))
                })
            }
        })
    })
    
    socket.on("send_user_id_to_get_chat", async (data) => {
        const result = await Chat.find({ users: { $elemMatch: { $regex: data.userID, $options: 'i' } } }).exec()
        if (result != null) {
            let chats = [...result]
            for (let index = 0; index < chats.length; index++) {
                if (data.type == "setter") {
                    const user = await Getter.findById(chats[index].users[1]).exec()
                    chats[index].title = user.login
                } else if (data.type == "getter") {
                    const user = await Setter.findById(chats[index].users[0]).exec()
                    chats[index].title = user.login
                }
            }
            chats = chats.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated))
            io.emit("get_chats", {result: chats})
        }
    })

    socket.on("get_messages", data => {
        Message.find({ chatID: data }).then(result => {
            if (result != null) {
                const res = result.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated))
                io.emit("set_messages", { result: res })
            }
        })
    })

    socket.on("save_message", data => {
        Message.create({ body: data.body, chatID: data.chatID, authorID: data.authorID }).then(result => {
            if (result != null) io.emit("set_messages", { result: [result] })
        })
    })
})


server.listen(process.env.PORT || 8080, "192.168.0.100", () => console.log("сервер запущен 8000"))
// server.listen(process.env.PORT || 8080, () => console.log("сервер запущен 8000"))   