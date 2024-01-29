import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { StudentService } from '../module/student/services/student.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  ngOnInit(): void {
  }

  value = {}
  constructor(
    private auth: AuthServiceService,
    private studentService: StudentService

  ){

  }

  isShown: string = 'teacher'; // hidden by default

  StudentForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    class: new FormControl('',[Validators.pattern('^[0-9]+$')]),
    role: new FormControl('',[Validators.pattern('^[a-zA-Z]+$')]),
  })

  toggleShow(val: string) {
    if (val == 'teacher') {
      this.isShown = 'student';
    }else{
      this.isShown = 'teacher';
    }
  }

  AddUser(){
    this.StudentForm.controls['role'].setValue(this.isShown);
    if (this.StudentForm.valid) {
      console.log(this.StudentForm.value)
      if (this.StudentForm.value.class!==undefined && this.StudentForm.value.class!=='' && this.StudentForm.value.class!==null) {
        this.studentService.addStudent(this.StudentForm.value);
      }else{
        if (this.isShown == 'student') {
          alert("Please Select Your Class")
        }
        else
          alert("Student Not Allowed Add Teacher")
      }
    }else{
      console.log(this.StudentForm.value)

      console.log("Validation error")
      alert(' Please Fill The Required Details')
    }

  }

  get email(){
    return this.StudentForm.get('email');
  }

  get password(){
    return this.StudentForm.get('password');
  }
  get name(){
    return this.StudentForm.get('name');
  }

  get class(){
    return this.StudentForm.get('class');
  }
  get role(){
    return this.StudentForm.get('role');
  }

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.email]),
    userpassword: new FormControl('',[Validators.required,Validators.minLength(6)]),
  })

  loginUser(){
    this.value  = {
      'email':this.loginForm.value.username,
      'password': this.loginForm.value.userpassword
    } 
    if (this.loginForm.valid) {
      this.auth.login(this.value)
    }else
    alert(' Please Fill The Required Details')


      console.log(this.value)
  }

  get username(){
    return this.loginForm.get('username');
  }
  get userpassword(){
    return this.loginForm.get('userpassword');
  }


}
