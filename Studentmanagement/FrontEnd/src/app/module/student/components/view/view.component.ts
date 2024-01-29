import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {


  filteredStatus = '';

  public data: Student[] = []  
  columnsToDisplay = ['name','email','role','action']
  
  constructor(
    private studentService: StudentService) { 
      this.studentService.getStudentList().subscribe(v =>{
        this.data = JSON.parse(JSON.stringify(v)).Data;
        console.log(JSON.parse(JSON.stringify(v)))
      })
   }

  //  StudentForm = new FormGroup({
  //   // email: new FormControl('lklklk'),
  //   // password: new FormControl('lkllkl'),
  //   // email: new FormControl(),
  //   // password: new FormControl(),
  //   // email: new FormControl('',[Validators.required,Validators.pattern(['a-zA-z'])]),
  //   email: new FormControl('',[Validators.required,Validators.email]),
  //   password: new FormControl('',[Validators.required,Validators.minLength(6)])
  // })

  ngOnInit(): void {
    
  }

  deleteStudent(datas: any){
    this.studentService.deleteStudent(datas.id).subscribe(v =>{
        // this.data = JSON.parse(JSON.stringify(v)).Data;

        this.data = this.data.filter((u:any)=> u!==datas);
        alert(JSON.parse(JSON.stringify(v)).message);
      })
  } 
  editStudent(data: any){

  }
  // AddStudent(){
    
  // }

}
