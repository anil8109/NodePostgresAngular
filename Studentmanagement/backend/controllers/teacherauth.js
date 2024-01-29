const Teacher = require("../models/").teacher
const jwt = require('jsonwebtoken');

Login = async (req, res) => {
    try {

        const getTeacher = await Teacher.findOne({where: {email: req.body.email, password: req.body.password}})
        
        if (!getTeacher) {
            
            return res.send({
                'status': false,
                'message': 'Unable to login',
                'Error': "Invalide Email Or Password"
            })
        }

        let jwtSecretKey = "gfg_jwt_secret_key";
        let jwtSecretKeyRefreshToken = "gfg_jwt_secret_key_refresh_token";
    
        const token = jwt.sign({
            id: getTeacher.id,
            name: getTeacher.name,
            email: getTeacher.email,
            class: getTeacher.class,
        }, jwtSecretKey, { expiresIn: 900})
        const refreshToken = jwt.sign({
            id: getTeacher.id,
            name: getTeacher.name,
            email: getTeacher.email,
            class: getTeacher.class,
        }, jwtSecretKeyRefreshToken, { expiresIn: 86400})
        
        return res.send({
            'status': true,
            'message': 'Login Success',
            'Token': token,
            "refreshToken": refreshToken,
            "expiresIn": 900
        })
    } catch (error) {
        console.log(error)
        return res.send({
            'status': false,
            'message': 'Unexpected Error',
            'Error': error
        })
    }
} 

module.exports = {
    Login
}