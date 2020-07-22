import bcrypt from 'bcrypt'

const salt =10

class Hashs{

     hashSenha(password){

        const hash = bcrypt.hashSync(password,salt);
    
        return hash;
    }
    compareSenha(password,hash){
      return  bcrypt.compareSync(password, hash)
    }

}

export default Hashs