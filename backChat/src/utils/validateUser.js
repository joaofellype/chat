import knex from '../database/config';


class ValidateUser {

    async validateEmail(email){

        let user = await knex.select('id').from('users').where('email_user',email).first();
        if(user){
            return false
        }
        return true;
    }
    async validateNumero(numero){

        let user = await knex.select('id').from('users').where('number_user',numero).first();
        if(user){
            return false
        }
        return true;
    }

}

export default ValidateUser