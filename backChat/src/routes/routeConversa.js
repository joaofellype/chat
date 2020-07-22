import express from 'express'
import ControllerConversa from '../controllers/controllerChat/Chat'
const routerConversa = express.Router();
const chat = new ControllerConversa();


routerConversa.post('/chat',chat.create)
routerConversa.get('/chat',chat.index)
routerConversa.get('/chat/:id',chat.show)


export default routerConversa;