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

GetTeacher = async (req, res) => {
    try {
        const TeacherData = await Teacher.findByPk(req.params.id);

        if (TeacherData) {
            return res.send({
                'status': true,
                'message': 'Teacher Fetched',
                'Data': TeacherData
            })
        }else
        {
            return res.send({
                'status': false,
                'message': 'Teacher Not found',
                'Error': "Error finding in teacher"
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

AddTeacher = async (req, res) => {
    try {

        const getTeacher = await Teacher.findOne({where: {email: req.body.email}})
        
        if (getTeacher) {
            
            return res.send({
                'status': false,
                'message': 'Unable to add teacher',
                'Error': "Teacher Already Found with the email you entered"
            })
        }

        const Teachers = await Teacher.create({ 
            'name': req.body.name, 'email': req.body.email,
            'password': req.body.password, 'role': req.body.role})

        if (Teachers) { 
            return res.send({
                'status': true,
                'message': 'Teacher Added',
                'Data': Teachers
            })
        }else
        {
            return res.send({
                'status': false,
                'message': 'Unable to add Teacher',
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

EditTeacher = async (req, res) => {
    try {

        const getTeacher = await Teacher.findByPk(req.params.id)

        if (!getTeacher) {
            
            res.send({
                'status': false,
                'message': 'Unable to edit teacher',
                'Error': "Teacher Not Found"
            })
        }

        const isTeacher = await Teacher.findOne({ where: {
            email: req.body.email, 
            id: {
                [Op.ne]: req.params.id
                }
        } })
        
        if (isTeacher) {
            
            return res.send({
                'status': false,
                'message': 'Unable to edit teacher',
                'Error': "Teacher Already Found with the email you entered"
            })
        }

        const TeacherData = await getTeacher.update( req.body );

        if (TeacherData) {
            return res.send( {
                'status': true,
                'message': 'Teacher Edited',
                'Data': TeacherData
            })
        }else
        {
            return res.send({
                'status': false,
                'message': 'Unable to edit Teacher',
                'Error': "Unexpected Error"
            })
        }
    } catch (error) {
        console.log(error+"lplpllpl")
        return res.send({
            'status': false,
            'message': 'Unexpected Error',
            'Error': error
        })
    }
} 

DeleteTeacher = async (req, res) => {
    try {
        const TeacherData = await Teacher.destroy({
            where: {
                id: req.params.id
            }
        })

        if (TeacherData) {
            return res.send({
                'status': true,
                'message': 'Teacher Deleted',
                'Data': TeacherData
            })
        }else
        {
            return res.send({
                'status': false,
                'message': 'Unable to delete Teacher',
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

DeleteTeachers = async (req, res) => {
    try {
        const Teachers = await Teacher.destroy({
            where: {
                id: req.body.id
            }
        })

        if (Teachers) {
            return res.send({
                'status': true,
                'message': 'Teachers Deleted',
                'Data': Teachers
            })
        }else
        {
            return res.send({
                'status': false,
                'message': 'Unable to delete Teacher or teacher not found',
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

module.exports = {
    GetTeachers,
    GetTeacher,
    AddTeacher,
    EditTeacher,
    DeleteTeacher,
    DeleteTeachers,
    GetStudents,
    GetStudent,
    AddStudent,
    EditStudent,
    DeleteStudent,
}