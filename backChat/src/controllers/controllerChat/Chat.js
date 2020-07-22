import knex from '../../database/config'

class Chat{

    async create(request,response){

        const{
            id_user1,
            id_user2,

        } = request.body;

      const chat =await knex('chats').insert({
           id_user1: id_user1,
           id_user2: id_user2
        }).then(results => {
            response.status(200).json({message:results})
        }).catch(error => {
            console.log(error);
            response.status(400).json({message:error})
        })
    }
    async index(request,response){
      
        const chats = await knex('chats')
                            .join('users','chats.id_user2','=','users.id')
                            .select('chats.id','users.id as userID','users.number_user','users.name_user','users.email_user','users.image_user')
        
        
        if(!chats){
            return response.status(400).json({message:'Nenhuma conversa existente'});
                    
        }
        return response.json(chats)
      
    }
    async show(request,response){

      

        const id = request.params.id
        let conversas =[]
        let chats = await knex('chats')
                            .join('users','chats.id_user2','=','users.id')
                            
                            .select('chats.id','users.id as userID','users.number_user','users.name_user','users.email_user','users.image_user').where('chats.id_user1',id).orWhere('chats.id_user2',id)
       
        let chats1 = await knex('chats')
                            .join('users','chats.id_user1','=','users.id')
                            
                            .select('chats.id','users.id as userID','users.number_user','users.name_user','users.email_user','users.image_user').where('chats.id_user1',id).orWhere('chats.id_user2',id)
       
                            
      
      
       
            
        for(let i=0;i<chats.length;i++){
            let a =  await knex('messages')
            .join('users','messages.id_user','=','users.id')
            .select('messages.id','messages.id_user','messages.id_user2','messages.id_chat','users.name_user','messages.body_message','messages.type_message').where('messages.id_chat',chats[i].id).orderBy('messages.created_at','desc').limit('1')
        
            conversas.push(a[0])
        }

    
        let chatouther = chats.map(function(chat){
            if(chat.userID !=id){
                return chat
            }
        })
        let chatouther1 = chats1.map(function(chat){
            if(chat.userID !=id){
                return chat
            }
            if(chat==null){
                return
            }
        })
        let op =[]
        for(var i=0;i<chatouther.length;i++){
           
               if( chatouther[i] !=null){
                op.push( chatouther[i]) 
               }
            }
        
        for(var j=0;j<chatouther1.length;j++){
            if(chatouther1[j] !=null){
                op.push(chatouther1[j]) 

            }
        }
        console.log(op)
        const tudo = {op,conversas}

        return response.json(tudo)
    } 
}

export default Chat