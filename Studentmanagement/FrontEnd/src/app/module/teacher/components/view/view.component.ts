import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher.model';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  ngOnInit(): void {
  }

  public data: Teacher[] = []  
  columnsToDisplay = ['name','email','role','action']
  
  constructor(
    private teacherService: TeacherService) { 
      this.teacherService.getTeachers().subscribe(v =>{
        this.data = JSON.parse(JSON.stringify(v)).Data;
        console.log(JSON.parse(JSON.stringify(v)))
      })
   }

   deleteTeacher(datas: any){
    this.teacherService.deleteTeacher(datas.id).subscribe(v =>{
        // this.data = JSON.parse(JSON.stringify(v)).Data;

        this.data = this.data.filter((u:any)=> u!==datas);
        alert(JSON.parse(JSON.stringify(v)).message);
      })
  }

}
