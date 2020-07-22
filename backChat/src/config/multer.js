import multer from 'multer'

import path from 'path'
import crypto from 'crypto'
export default{
    storage:multer.diskStorage({
        destination:path.resolve(__dirname, '..', '..' , 'uploads'),
        filename(request,file,callback){
            const hash = crypto.randomBytes(6).toString('hex')

            const fileName = `${hash}-${file.originalname}`
            callback(null,fileName);
        }

    }),
    fileFilter:(req,file,cb) =>{
        
        const isAccepted = ['image/png','image/jpeg','image/jpg'].find(formatoAceito => formatoAceito == file.mimetype );

        if(isAccepted){
            // Executamos o callback com o segundo argumento true (validação aceita)
            return cb(null, true);
        }

        return cb(null, false);
    }
}