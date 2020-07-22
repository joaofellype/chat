import express from 'express'
import multer from 'multer'
import multerConfig from '../config/multer'
import  ControllerMessage from '../controllers/controllerMessage/Message'
const routerMessage = express.Router();
const message = new ControllerMessage();
const upload = multer(multerConfig);


routerMessage.post('/message',message.create)
routerMessage.get('/message/:id',message.index)
routerMessage.post('/imageMessage',upload.single('image'),message.upload)



export default routerMessage;