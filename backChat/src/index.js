import express from 'express'
import http from 'http'
import SocketIo from 'socket.io'
import fs from 'fs'
import path from 'path'
const app = express();
import cors from 'cors'
const server = http.Server(app);
let io = new SocketIo(server)
const port = 3333
var usuarios = [];
let onlineUser = {}
import routeUser from './routes/routeUser';
import routeConversa from './routes/routeConversa'
import routeMessage from './routes/routeMessage'
app.use(express.json());
app.use(cors())

app.use(express.static('public'));

app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads')))

app.use(routeUser);
app.use(routeConversa)
app.use(routeMessage)

io.on("connection", function (socket) {

    socket.on("enviar mensagem", function (dados) {

        console.log(dados)
            io.emit("enviar mensagem", dados);
       
    });
    
    socket.on("entrar", function (apelido, callback) {
        console.log(usuariosr)
        if (!(apelido in usuarios)) {
            socket.apelido = apelido
            usuarios[apelido] = socket;
            onlineUser[socket.id] =socket
            callback(true);
        } else {
            callback(false);
        }
    });
    socket.on('disconnect',function(){
      delete usuarios[socket.id]
    })
})


server.listen(port, () => {
    console.log(`Porta rodadndo ${port}`)
})

export default server;