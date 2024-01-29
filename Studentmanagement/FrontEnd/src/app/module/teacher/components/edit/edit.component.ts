import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';
import { StudentService } from 'src/app/module/student/services/student.service';
import { Teacher } from '../../models/teacher.model';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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
    private studentService: StudentService,
    private auth: AuthServiceService,
    private router: Router

    ) {

      this.subscription = this.route.params.subscribe(
        (params: Params) => {
          this.val = params['id']
        }
      )

      teacherService.getTeacher(this.val).subscribe(v =>{
        this.data = JSON.parse(JSON.stringify(v)).Data;
        this.isShown = JSON.parse(JSON.stringify(v)).Data.role;
        this.TeacherForm.patchValue(this.data)
        // this.data = JSON.parse(JSON.stringify(this.data));
        // this.data = JSON.parse(JSON.stringify(this.data))
        console.log(this.data)
      })

     }


     value = {}


  TeacherForm = new FormGroup({
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
    this.TeacherForm.controls['role'].setValue(this.isShown);
    if (this.TeacherForm.valid) {
      console.log(this.TeacherForm.value)
      if (this.TeacherForm.value.class!==undefined && this.TeacherForm.value.class!=='' && this.TeacherForm.value.class!==null) {
        this.studentService.addStudent(this.TeacherForm.value).subscribe((data: any)=> {
        });
        this.teacherService.deleteTeacher(this.val).subscribe(v =>{
          // this.data = JSON.parse(JSON.stringify(v)).Data;
  
          this.data = this.dataList.filter((u:any)=> u!==this.val);
          alert(JSON.parse(JSON.stringify(v)).message);
          this.router.navigate(['/teacher/students'])
        })

      }else{
        if (this.isShown == 'student') {
          alert("Please Select Your Class")
        }
        else if(this.isShown == 'teacher'){
            this.teacherService.editTeacher(this.val,this.TeacherForm.value).subscribe((data: any)=> {
            this.router.navigate(['/teacher/home']) 
            })
        }
        else{
          console.log(this.TeacherForm.value)
          console.log("Validation error")
          alert(' Please Fill The Required Details')
        }

      }
    }
  }
  get email(){
    return this.TeacherForm.get('email');
  }

  get password(){
    return this.TeacherForm.get('password');
  }
  get name(){
    return this.TeacherForm.get('name');
  }

  get class(){
    return this.TeacherForm.get('class');
  }
  get role(){
    return this.TeacherForm.get('role');
  }


}
