const jwt = require('jsonwebtoken')
import config from '../config/config'

    module.exports = (req,res,next)=>{
        
        const authHeader = req.headers.authorization;
            console.log(config.HASH_TOKEN)
        if(!authHeader)
            return res.status(400).json({message:'Token não informado'})
        
        const parts = authHeader.split(' ');

        if(!parts.length === 2)
            return res.status(400).json({message:' Erro no token'})
        
        const [scheme,token] = parts;

        if(!/^Bearer$/i.test(scheme))
            return res.status(400).json({message:'Token mal formatado'})
        
        jwt.verify(token,config.HASH_TOKEN,(err,decoded) =>{
         
            if(err) return res.status(401).json({message:'Token invalido'});

            req.user = decoded.user
            return next();
        });

    }