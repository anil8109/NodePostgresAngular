import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/module/teacher/models/teacher.model';
import { TeacherService } from 'src/app/module/teacher/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  public data: Teacher[] = []  
  constructor(
    private teacherService: TeacherService
  ) { 
    this.teacherService.getTeachersList().subscribe(v =>{
      // alert(JSON.parse(JSON.stringify(v)).message)
      this.data = JSON.parse(JSON.stringify(v)).Data;
      console.log(JSON.parse(JSON.stringify(v)))
    })
   }

  ngOnInit(): void {
  }

  deleteteacher(teacher: Teacher){
    alert("you are not permitted to do action on teachers data")
  }
}
