const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')

require("./configs/db")
require("dotenv").config()

const indexRouter = require('./routes/index');
const needyRouter = require('./routes/needy');
const giverRouter = require('./routes/giver');
const advertisementsRouter = require('./routes/advertisements');
const authGiverRouter = require('./routes/authGiver');
const authNeedyRouter = require('./routes/authNeedy');
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
app.use('/needy', needyRouter);
app.use('/giver', giverRouter);
app.use('/advertisements', advertisementsRouter);
app.use('/auth/needy', authNeedyRouter);
app.use('/auth/giver', authGiverRouter);
app.use("/notifications", notificationsRouter)

const http = require("http")
const server = http.createServer(app)

const { Server } = require("socket.io");
const Chat = require('./models/Chat');
const Message = require('./models/Message');
const Needy = require('./models/Needy');
const Giver = require('./models/Giver');

const io = new Server(server)
io.on("connection", socket => {
    console.log("connected!");
    
    socket.on("create_chat", data => {
        Chat.findOne({ users: data }).then(chat => {
            if (chat != null) io.emit("getCreatedChat", chat)
            else {
                Needy.findById(data[1]).then(user => {
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
                if (data.type == "giver") {
                    const user = await Needy.findById(chats[index].users[1]).exec()
                    chats[index].title = user.login
                } else if (data.type == "needy") {
                    const user = await Giver.findById(chats[index].users[0]).exec()
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


// server.listen(process.env.PORT || 8080, "192.168.0.100", () => console.log("сервер запущен 8000"))
server.listen(process.env.PORT || 8080, () => console.log("сервер запущен 8000"))   