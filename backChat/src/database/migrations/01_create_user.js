
module.exports={

 async  up(knex){
    return knex.schema.createTable('users',table=>{
        table.uuid('id').primary().notNullable();
        table.string('email_user').notNullable();
        table.string('number_user').notNullable();
        table.string('password_user').notNullable();
        table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));

        table.string('image_user');
    })
},
    async  down(knex){
    return knex.schema.dropTable('users')
}
}