import knex from '../../database/config'
import { v4 as uuidv4 } from 'uuid';
import Hashs from './hashs'
import Token from '../../utils/genereteToken'
import  ValidateUser from '../../utils/validateUser';
import sharp from 'sharp'
import path from 'path'
import fs  from 'fs'
const hashs = new Hashs();
const validadate = new ValidateUser();
const token = new Token()
class UserController{

    async index (request,response){

        const items = await knex.select('id','name_user','email_user','number_user','image_user').from('users');

        if(!items){
            response.json({message:'Nenhum usuário cadastrado'})
            return;
        }
        return response.json(items)
    }

    async create(request,response){

        const {
                name_user,
                email_user,
                number_user,
                password_user,
                
        } = request.body;
        if(!name_user || !email_user || !number_user || !password_user ){
            return  response.status(400).json({message:'Campo existente vazio'});
        }
        if(password_user.length <6){
            return  response.status(400).json({message:'Digite uma senha maior que 6 caracteres'});
        }
       let  validateEMAIL =await validadate.validateEmail(email_user)
       let validateNumber =  await validadate.validateNumero(number_user)
        
       if(validateEMAIL==false){
           return response.status(400).json({message:'Email já exsstente'})
       }
       if(validateNumber==false){
           return response.status(400).json({message:'Número já exsstente'})
       }
  
        const hashP = hashs.hashSenha(password_user);
    
        const id = uuidv4();
        await knex('users').insert({
            id:id,
            name_user:name_user,
            email_user:email_user,
            number_user:number_user,
            password_user:hashP
        }).then(result=>{
            response.status(200).json({
                message:'Usuário criado com sucesso'
            })
        }).catch(error=>{
            console.log(error)
            response.status(400).json({
                message:error
            })
        })
    }
    async show(request, response){
        const id = request.params.id;
        console.log(id)
        const user = await knex.select('id','name_user','email_user','number_user','image_user').from('users').where('id',id).first();

        response.json(user);
    }
    async login(request,response){

        const {
            email,
            password
        } = request.body;

        const user = await knex.select('email_user','password_user','number_user','name_user','image_user','id').from('users').where('email_user',email).first();
        if(!user){
            return response.status(400).json({message:'Usuário não existe'});
        }
        const validate =hashs.compareSenha(password,user.password_user);
        if(!validate){
            return response.status(400).json({message:'Senha Incorreta'})
        }
        user.password_user = undefined
        console.log(user)
        const tokens = token.genereteToken(user);

        return response.status(200).json({token:tokens})



    }
    async upload(request,response){
        console.log(request.file)



        return response.json({message:`http://192.168.100.4:3333/uploads/${request.file.filename}`})
   
    }

    async searchUser(request,response){

        const name  = `%${request.query.name}%`;
        console.log(name)
        const users = await knex('users').where('name_user','ilike',name);

        if(users.length <=0){
            return response.status(400).json({message:'Nenhum usuário foi encontrado'});
        }
        return response.json(users)

    }

    async updateUser(request,response){
        const id = request.params.id
        const {

            name_user,
            image_user,
            number_user
        }  = request.body;
        console.log(id)
        await knex('users').returning('*').where('id',id).update({
            name_user:name_user,
            image_user:image_user,
            number_user:number_user
        }).then(results=>{
            response.status(200).json({message:'Alteração feita com  sucesso',result:results})
        }).catch(error=>{
            console.log(error)
            response.status(400).json({message:error})
        })
    }

}

export default UserController;