
module.exports={

    async  up(knex){
       return knex.schema.createTable('uploads',table=>{
           table.increments('id').primary().notNullable();
           table.string('path').notNullable();
         
           table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
           table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
   
       })
   },
       async  down(knex){
       return knex.schema.dropTable('uploads')
   }
   }