const Student = require("../controllers/students.js")
const auth = require("../middleware/checkStudent")
var express = require('express'),
router = express.Router();

router.get('/get_students', [auth.checkToken, auth.checkUser] , Student.GetStudents)
router.get('/get_teachers_list', [auth.checkToken, auth.checkUser] , Student.GetTeachers)

router.get('/get_one_student/:id', [auth.checkToken, auth.checkUser] , Student.GetStudent)

router.post('/add_student', [auth.checkToken, auth.checkUser] , Student.AddStudent)

router.post('/register_student' , Student.AddStudent)

router.patch('/edit_student/:id', [auth.checkToken, auth.checkUser] ,Student.EditStudent)

router.delete('/delete_student/:id', [auth.checkToken, auth.checkUser] , Student.DeleteStudent)

router.delete('/delete_students/:class', [auth.checkToken, auth.checkUser] , Student.DeleteStudentsClassWise)

module.exports = router;