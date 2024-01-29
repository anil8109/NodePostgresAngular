const Student = require("../models/").student
const Teacher = require("../models/").teacher
const { Op } = require("sequelize");

GetTeachers = async (req, res) => {
    try {
        const Teachers = await Teacher.findAll({})
        if (Teachers) {
            return res.send({
                'status': true,
                'message': 'Teachers Fetched',
                'Data': Teachers
            })
        }else
        {
            return res.send({
                'status': false,
                'message': 'Unable to select Teachers',
                'Error': "Unexpected Error"
            })
        }
    } catch (error) {
        return res.send({
            'status': false,
            'message': 'Unexpected Error',
            'Error': error
        })
    }
} 
GetStudents = async (req, res) => {
    try {
        const StudentData = await Student.findAll({})
        
        if (StudentData) {
            res.send({
                'status': true,
                'message': 'Students Fetcheds',
                'Data': StudentData,
            })
        }else
        {
            res.send({
                'status': false,
                'message': 'Unable to select students',
                'Error': "Unexpected Error"
            })
        }
    } catch (error) {
        res.send({
            'status': false,
            'message': 'Unexpected Error',
            'Error': error
        })
    }
} 

GetStudent = async (req, res) => {
    try {
        const StudentData = await Student.findByPk(req.params.id);

        if (StudentData) {
            return res.send({
                'status': true,
                'message': 'Student Fetched',
                'Data': StudentData
            })
        }else
        {
            return res.send({
                'status': false,
                'message': 'Student Not Found',
                'Error': "Unable to select student"
            })
        }
    } catch (error) {
        return res.send({
            'status': false,
            'message': 'Unexpected Error',
            'Error': error
        })
    }
} 

AddStudent = async (req, res) => {
    try {

        const getStudent = await Student.findOne({ where: { email: req.body.email, } });
        if (getStudent) {
            
            return res.send({
                'status': false,
                'message': 'Unable to add student',
                'Error': "Students Already Found with the email you entered"
            })
        }

        const result = await Student.create({
            "name": req.body.name,
            "email": req.body.email,
            "class": req.body.class,
            "role": req.body.role,
            "password": req.body.password
        })
        

        if (!result) {
            res.send({
                'status': false,
                'message': 'Unable to add student',
                'Error': "Unexpected Error"
            })
            
        }else
        {
            res.send({
                'status': true,
                'message': 'Student Added',
                'Data': result
            })
        }
    } catch (error) {
        console.log(error)
        res.send({
            'status': false,
            'message': 'Unexpected Errorddd',
            'Error': error
        })
    }
} 

EditStudent = async (req, res) => {
    try {

        const StudentData = await Student.findByPk(req.params.id);

        if (!StudentData) {
            return res.send({
                'status': false,
                'message': 'Could Not Find Record',
                'Data': []
            })
        }


        const getStudent = await Student.findOne({ 
            where: {
                    email: req.body.email, 
                    id: {
                        [Op.ne]: req.params.id
                    }
            }
        })
        
        if (getStudent) {
            
            return res.send({
                'status': false,
                'message': 'Unable to edit student',
                'Error': "Students Already Found with the email you entered"
            })
        }

        const isUpdated = await StudentData.update(req.body)
        if (isUpdated) {
            return res.send({
                'status': true,
                'message': 'Student Edited',
                'Data': StudentData
            })
        }else
        {
            return res.send({
                'status': false,
                'message': 'Unable to edit student',
                'Error': "Unexpected Error"
            })
        }
    } catch (error) {
        console.log(error)
        return res.send({
            'status': false,
            'message': 'Unexpected Error',
            'Error': error
        })
    }
} 

DeleteStudent = async (req, res) => {
    try {

        const StudentData = await Student.findByPk(req.params.id);

        if (!StudentData) {
            return res.send({
                'status': false,
                'message': 'Could Not Find Record',
                'Data': []
            })
        }

        const deleteStudent =  Student.destroy({
            where: { id: req.params.id }
          })
        if (!deleteStudent) {
            
            res.send({
                'status': false,
                'message': 'Unable to delete student',
                'Error': "Student Not Found"
            })
        }else
        {
            res.send({
                'status': true,
                'message': 'Student Deleted',
                'Data': deleteStudent
            })
        }
    } catch (error) {
        res.send({
            'status': false,
            'message': 'Unexpected Error',
            'Error': error
        })
    }
} 

DeleteStudentsClassWise = async (req, res) => {
    try {

        const getStudent = await Student.findOne({where: 
            {class: req.params.class}
        })
        
        if (!getStudent) {
            
            return res.send({
                'status': false,
                'message': 'Unable to delete student',
                'Error': "Students Not Found"
            })
        }

        const StudentData = await Student.destroy({ where: { class: req.params.class }});

        if (!StudentData) {
            
            return res.send({
                'status': false,
                'message': 'Unable to delete student',
                'Error': "Unexpected Error"
            })
        }else
        {
            return res.send({
                'status': true,
                'message': 'Class '+req.params.class+' Students Deleted',
                'Data': StudentData
            })
        }
    } catch (error) {
        return res.send({
            'status': false,
            'message': 'Unexpected Error',
            'Error': error
        })
    }
} 


module.exports = {
    GetTeachers,
    GetStudents,
    GetStudent,
    AddStudent,
    EditStudent,
    DeleteStudent,
    DeleteStudentsClassWise
}