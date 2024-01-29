const Student = require("../models").student
const jwt = require("jsonwebtoken");

checkToken = async (req, res, next) => {
    try {
        const token = req.headers["accesstoken"];
        if (!token) {
            return res.send({
                'status': false,
                'message': 'Unable to process request',
                'Error': "accessToken Missing"
            })
        }
        const verified = await jwt.verify(token, "gfg_jwt_secret_key");       
        console.log('runni');
 
        if (!verified) {
            
            return res.send({
                'status': false,
                'message': 'Unable to login',
                'Error': "Unauthorised user"
            })
        }
        req.userId = verified.id
        console.log(verified)

        next()

    } catch (error) {
        console.log(error)
        return res.send({
            'status': false,
            'message': 'Unexpected Error',
            'Error': error
        })
    }
}

checkUser = async (req, res, next) => {
    try {
        const getStudent = await Student.findByPk(req.userId)
        
        if (!getStudent) {
            
            return res.send({
                'status': false,
                'message': 'Unable to login',
                'Error': "User Not Found"
            })
        }

        next()

    } catch (error) {
        res.send({
            'status': false,
            'message': 'Unexpected Error',
            'Error': error
        })
    }
} 

module.exports = {
    checkToken,
    checkUser
}