
module.exports={

    async  up(knex){
       return knex.schema.createTable('messages',table=>{
           table.increments('id').primary().notNullable();
           table.string('body_message').notNullable();
           table.uuid('id_user').notNullable().references('id').inTable('users');
           table.integer('id_upload').notNullable().references('id').inTable('uploads');
           table.integer('id_chat').notNullable().references('id').inTable('chats');
           table.string('type_message').notNullable();
           table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
           table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
   
       })
   },
       async  down(knex){
       return knex.schema.dropTable('messages')
   }
   }