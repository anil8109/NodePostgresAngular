import { Injectable } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Teacher } from '../models/teacher.model';
import { Student } from '../../student/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  url = "http://localhost:3000/teachers/"

  constructor(
    private http: HttpClient,
    private auth: AuthServiceService,
    private router: Router
  ) { }

  addNewStudent(student: any): Observable<Student> {
    let token = this.auth.getToken()
    
    this.http.post<Student>(this.url+"add_student",
    student,
    {
      headers: new HttpHeaders({ 'accesstoken': JSON.stringify(token).replace(/\"/g,'') }),
    })
      .subscribe(res => {
        let result = JSON.parse(JSON.stringify(res))
        console.log(result.status)
        // if (result == true) {
        //   this.setToken(result.Token)
        // }

        if (result.status == true) {
          this.router.navigate(['/student/home'])
          alert(result.message)

        }else{
          alert("Message: "+result.message+",  Error: "+result.Error)
          // this.router.navigate(['admin/Home'])
          console.log("Message: "+result.message+",  Error: "+result.Error)

        }
    })

  return throwError(new Error('Something Went Wrong'));    
}

getStudentList() {

    let token = this.auth.getToken()
    
    return this.http.get<Student[]>(this.url+"get_students/",
    {
      headers: new HttpHeaders({ 'accesstoken': JSON.stringify(token).replace(/\"/g,'') }),
    })

}

getStudent(id :string): Observable<Student> {
  let token = this.auth.getToken()

  return this.http.get<Student>(this.url+"get_one_student/"+id,
    {
      headers: new HttpHeaders({ 'accesstoken': JSON.stringify(token).replace(/\"/g,'') }),
    })
  }

  deleteStudent(id: any){
  let token = this.auth.getToken()
    return this.http.delete<Student>(this.url+"delete_student/"+id,
    {
      headers: new HttpHeaders({ 'accesstoken': JSON.stringify(token).replace(/\"/g,'') }),
    })
  }
  editStudent(id: any,student: any){
    let token = this.auth.getToken()
    return this.http.patch<Student>(this.url+"edit_student/"+id,student,
    {
      headers: new HttpHeaders({ 'accesstoken': JSON.stringify(token).replace(/\"/g,'') }),
    })
    // return 0;
  }

  getTeachersList() {

      let token = this.auth.getToken()
      this.url = "http://localhost:3000/students/"
      return this.http.get<Teacher[]>(this.url+"get_teachers_list/",
      {
        headers: new HttpHeaders({ 'accesstoken': JSON.stringify(token).replace(/\"/g,'') }),
      })

  }

  getTeacher(id :string): Observable<Teacher> {
    let token = this.auth.getToken()

    return this.http.get<Teacher>(this.url+"get_one_teacher/"+id,
      {
        headers: new HttpHeaders({ 'accesstoken': JSON.stringify(token).replace(/\"/g,'') }),
      })
    }

  getTeachers() {
    this.url = "http://localhost:3000/teachers/"
    
    let token = this.auth.getToken()
    
    return this.http.get<Teacher[]>(this.url+"get_teachers/",
    {
      headers: new HttpHeaders({ 'accesstoken': JSON.stringify(token).replace(/\"/g,'') }),
    })

  } 

  deleteTeacher(id: any){
    let token = this.auth.getToken()
    return this.http.delete<Teacher>(this.url+"delete_teacher/"+id,
    {
      headers: new HttpHeaders({ 'accesstoken': JSON.stringify(token).replace(/\"/g,'') }),
    })
  }

  editTeacher(id: any,teacher: any){
    let token = this.auth.getToken()
    return this.http.patch<Teacher>(this.url+"edit_teacher/"+id,teacher,
    {
      headers: new HttpHeaders({ 'accesstoken': JSON.stringify(token).replace(/\"/g,'') }),
    })
    // return 0;
  }

  addTeacher(teacher: any): Observable<Teacher> {
      this.url = "http://localhost:3000/teachers/"

      this.http.post<Teacher>(this.url+"register_teacher",teacher)
        .subscribe(res => {
          let result = JSON.parse(JSON.stringify(res))
          console.log(result.status)
          
          if (result.status == true) {
            this.router.navigate(['/teacher/home'])
            alert(result.message)

          }else{
            alert("Message: "+result.message+",  Error: "+result.Error)
            // this.router.navigate(['admin/Home'])
          }
      })

    return throwError(new Error('Something Went Wrong'));    
  }
}
