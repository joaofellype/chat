import express, { Router } from 'express';
import multer from 'multer'
import multerConfig from '../config/multer'
import ControllerUser from '../controllers/controllerUsers/Users'
import Token from '../utils/genereteToken'
const routeUser = express.Router();

const token = new Token();
const controllerUser = new ControllerUser();
const upload = multer(multerConfig);

routeUser.get('/autenticUser',token.validateToken)
routeUser.get('/users',controllerUser.index);
routeUser.get('/users/:id',controllerUser.show);
routeUser.post('/users',controllerUser.create)
routeUser.post('/login',controllerUser.login)
routeUser.post('/image',upload.single('image'),controllerUser.upload)
routeUser.put('/updateUser/:id',controllerUser.updateUser)
routeUser.get('/searchUsers',controllerUser.searchUser) 
export default routeUser;