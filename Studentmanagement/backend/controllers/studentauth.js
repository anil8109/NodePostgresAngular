const Student = require("../models/").student

const jwt = require('jsonwebtoken');

Login = async (req, res) => {
    try {

        const getStudent = await Student.findOne({where: {email: req.body.email, password: req.body.password}})
        
        if (!getStudent) {
            
            return res.send({
                'status': false,
                'message': 'Unable to login',
                'Error': "Invalide Email Or Password"
            })
        }

        let jwtSecretKey = "gfg_jwt_secret_key";
        let jwtSecretKeyRefreshToken = "gfg_jwt_secret_key_refresh_token";
    
        const token = jwt.sign({
            id: getStudent.id,
            name: getStudent.name,
            email: getStudent.email,
            class: getStudent.class,
        }, jwtSecretKey, { expiresIn: 900})
        const refreshToken = jwt.sign({
            id: getStudent.id,
            name: getStudent.name,
            email: getStudent.email,
            class: getStudent.class,
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