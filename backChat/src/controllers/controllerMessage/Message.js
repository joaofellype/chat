import knex from '../../database/config'

class Message {

    async create(request, response) {

        const {
            body_message,
            id_user,
            id_user2,
            id_chat,
            id_upload,
            type_message,
            path_image

        } = request.body;
        if(id_chat == null ){

       
                const chat =await knex('chats').returning('id').insert({
                    id_user1: id_user,
                    id_user2: id_user2
                 })
                 console.log(chat[0])
                await knex('messages').insert({
                    body_message,
                    id_user,
                    id_chat:chat[0],
                    id_upload,
                    id_user2,
                    type_message,
                    path_image
                }).then(results => {
                    response.status(200).json({
                        message: results,idChat:chat[0]
        
                    })
                }).catch(error => {
                    console.log(error)
                    response.status(400).json({
                        message: error
                    })
                })

            
          
        }else{
                await knex('messages').insert({
                    body_message,
                    id_user,
                    id_chat,
                    id_upload,
                    id_user2,
                    type_message,
                    path_image
                }).then(results => {
                    response.status(200).json({
                        message: results
        
                    })
                }).catch(error => {
                    console.log(error)
                    response.status(400).json({
                        message: error
                    })
                }) 
        }
        
    }

    async index(request, response) {

         const id= request.params.id
        const messages = await knex('messages')
            .join('users', 'messages.id_user', '=', 'users.id')
            .select('messages.body_message','users.id', 'users.name_user','messages.path_image','messages.type_message', 'messages.created_at').where("messages.id_chat",id).orderBy('messages.created_at','asc');
            

        if (messages.length <= 0) {
            return response.status(400).json({
                message: 'Nenhuma conversa existente'
            });

        }
        return response.json(messages)
    }
    async show(request, response) {
        
        const messages = await knex('messages')
            .join('users', 'messages.id_user', '=', 'users.id')
            .select('messages.body_message', 'users.name_users', 'messages.created_at');

        if (messages.length <= 0) {
            return response.status(400).json({
                message: 'Nenhuma conversa existente'
            });

        }
        return response.json(messages)
    }
    async upload(request,response){
        console.log(request.file)
        response.json({message:`http://192.168.100.4:3333/uploads/${request.file.filename}`})
   
    }
}

export default Message