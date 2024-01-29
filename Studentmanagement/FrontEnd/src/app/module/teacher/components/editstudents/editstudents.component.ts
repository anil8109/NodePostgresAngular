import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';
import { StudentService } from 'src/app/module/student/services/student.service';
import { Teacher } from '../../models/teacher.model';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-editstudents',
  templateUrl: './editstudents.component.html',
  styleUrls: ['./editstudents.component.css']
})
export class EditstudentsComponent implements OnInit {

  private subscription: Subscription = new Subscription()
  val = '';
  data = {};
  dataList: Teacher[] = [];
  isShown: string = 'teacher'; // hidden by default

  ngOnInit(): void {  
    
  }
  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private auth: AuthServiceService,
    private router: Router

    ) {

      this.subscription = this.route.params.subscribe(
        (params: Params) => {
          this.val = params['id']
        }
      )
      teacherService.getStudent(this.val).subscribe(v =>{
        this.data = JSON.parse(JSON.stringify(v)).Data;
        this.isShown = JSON.parse(JSON.stringify(v)).Data.role;
        this.StudentForm.patchValue(this.data)
        // this.data = JSON.parse(JSON.stringify(this.data));
        // this.data = JSON.parse(JSON.stringify(this.data))
        console.log(this.data)
      })

     }


     value = {}


  StudentForm = new FormGroup({
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

  EditUser(){
    this.StudentForm.controls['role'].setValue(this.isShown);
    if (this.StudentForm.valid) {
      console.log(this.StudentForm.value)
      if (this.isShown !== 'teacher' && this.StudentForm.value.class!==undefined && this.StudentForm.value.class!=='' && this.StudentForm.value.class!==null) {
        this.teacherService.editStudent(this.val,this.StudentForm.value).subscribe((data: any)=> {
          this.router.navigate(['/teacher/students'])
        });

      }else{
        if (this.isShown == 'student') {
          alert("Please Select Your Class")
        }
        else if(this.isShown == 'teacher'){
              this.teacherService.addTeacher(this.StudentForm.value).subscribe((data: any)=> {
              // this.router.navigate(['/teacher/home']) 
            })
            this.teacherService.deleteStudent(this.val).subscribe((data: any)=> {
              alert('Student Deleted')
              this.router.navigate(['/teacher/home']) 
            })
        }
        else{
          console.log(this.StudentForm.value)
          console.log("Validation error")
          alert(' Please Fill The Required Details')
        }

      }
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
}
