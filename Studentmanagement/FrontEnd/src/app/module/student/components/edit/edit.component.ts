import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private subscription: Subscription = new Subscription()
  val = '';
  data = {};
  isShown: string = 'teacher'; // hidden by default

  ngOnInit(): void {  
    
  }
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private auth: AuthServiceService,
    private router: Router

    ) {

      this.subscription = this.route.params.subscribe(
        (params: Params) => {
          this.val = params['id']
        }
      )

      studentService.getStudent(this.val).subscribe(v =>{
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
    name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9 ]*$')]),
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
      if (this.isShown == 'student' && this.StudentForm.value.class!==undefined && this.StudentForm.value.class!=='' && this.StudentForm.value.class!==null) {
        this.studentService.editStudent(this.val,this.StudentForm.value).subscribe((data: any)=> {
          this.router.navigate(['/student/home'])
        });

      }else{
        if (this.isShown == 'student') {
          alert("Please Select Your Class bcz... Any action on teacher not allowed")
        }
        else
          alert("Any action on teacher not allowed")
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


}
