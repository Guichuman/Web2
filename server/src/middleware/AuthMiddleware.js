const jwt = require("jsonwebtoken")

require('dotenv').config();

const secret = process.env.JWT_SECRET

module.exports = function(req, res, next){
  
    
    try {
        const authToken = req.headers['authorization']
        
        if(authToken){
            const bearer = authToken.split(' ')
            let token = bearer[1]
            jwt.verify(token, secret, (erro, decoded) => {

                if(erro){
                    res.status(403).json({error: "Não foi possível validar o token"})
                    return
                }

                req.userEmail = decoded.email
                next();
            })
        }else{
            res.status(403).json({msg: "Voce não esta autenticado"})
            return
        }
    } catch (error) {
        res.status(403).json({error: "Não foi possivel verificar o jwt"})
        return
    }
    
}