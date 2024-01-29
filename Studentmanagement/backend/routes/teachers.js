const Teacher = require("../controllers/teachers")
const auth = require("../middleware/checkTeacher")

var express = require('express'),
router = express.Router();

router.get('/get_teachers', [auth.checkToken, auth.checkUser] ,Teacher.GetTeachers)

router.get('/get_one_teacher/:id', [auth.checkToken, auth.checkUser] ,Teacher.GetTeacher)

router.post('/add_teacher', [auth.checkToken, auth.checkUser] ,Teacher.AddTeacher)
router.post('/register_teacher' ,Teacher.AddTeacher)

router.patch('/edit_teacher/:id', [auth.checkToken, auth.checkUser] ,Teacher.EditTeacher)

router.delete('/delete_teacher/:id', [auth.checkToken, auth.checkUser] ,Teacher.DeleteTeacher)
router.delete('/delete_teachers', [auth.checkToken, auth.checkUser] ,Teacher.DeleteTeachers)

router.get('/get_students', [auth.checkToken, auth.checkUser] , Teacher.GetStudents)

router.get('/get_one_student/:id', [auth.checkToken, auth.checkUser] , Teacher.GetStudent)

router.post('/add_student', [auth.checkToken, auth.checkUser] , Teacher.AddStudent)

router.patch('/edit_student/:id', [auth.checkToken, auth.checkUser] ,Teacher.EditStudent)

router.delete('/delete_student/:id', [auth.checkToken, auth.checkUser] , Teacher.DeleteStudent)

module.exports = router;