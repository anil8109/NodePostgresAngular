import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { StudentService } from 'src/app/module/student/services/student.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  ngOnInit(): void {
  }

  value = {}
  constructor(
    private auth: AuthServiceService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private router: Router

  ){

  }

  isShown: string = 'teacher'; // hidden by default

  UserForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]+$')]),
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
    this.UserForm.controls['role'].setValue(this.isShown);
    if (this.UserForm.valid) {
      console.log(this.UserForm.value)
      if (this.UserForm.value.class!==undefined && this.UserForm.value.class!=='' && this.UserForm.value.class!==null) {
        this.studentService.addStudent(this.UserForm.value).subscribe((data: any)=> {
          // this.router.navigate(['/teacher/students']) 
          });
      }else{
        // this.studentService.addStudent(this.UserForm.value);
        if (this.isShown == 'student') {
          alert("Please Select Your Class")
        }
        else
        this.teacherService.addTeacher(this.UserForm.value).subscribe((data: any)=> {
          
          })
      }
    }else{
      alert("Please Fill The Required Details")

      console.log(this.UserForm.value)

      console.log("Validation error")
    }

  }

  get email(){
    return this.UserForm.get('email');
  }

  get password(){
    return this.UserForm.get('password');
  }
  get name(){
    return this.UserForm.get('name');
  }

  get class(){
    return this.UserForm.get('class');
  }
  get role(){
    return this.UserForm.get('role');
  }


}
