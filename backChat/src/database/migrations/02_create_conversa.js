
module.exports={

    async  up(knex){
       return knex.schema.createTable('chats',table=>{
           table.increments('id').primary().notNullable();
           table.uuid('id_user1').notNullable();
           table.uuid('id_user2').notNullable();
           table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
           table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
   
       })
   },
       async  down(knex){
       return knex.schema.dropTable('chats')
   }
   }