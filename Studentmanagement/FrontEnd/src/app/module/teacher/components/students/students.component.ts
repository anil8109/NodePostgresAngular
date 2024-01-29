import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/module/student/models/student.model';
import { StudentService } from 'src/app/module/student/services/student.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  ngOnInit(): void {
  }

  filteredStatus = '';

  public data: Student[] = []  
  columnsToDisplay = ['name','email','role','action']
  
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    ) { 
      this.teacherService.getStudentList().subscribe(v =>{
        this.data = JSON.parse(JSON.stringify(v)).Data;
        console.log(JSON.parse(JSON.stringify(v)))
      })
   }


  deleteStudent(datas: any){
    this.teacherService.deleteStudent(datas.id).subscribe(v =>{
        // this.data = JSON.parse(JSON.stringify(v)).Data;
        this.data = this.data.filter((u:any)=> u!==datas);
        alert(JSON.parse(JSON.stringify(v)).message);
      })
  } 

}
