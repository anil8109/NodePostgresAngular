import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Observable } from 'rxjs-observable';
// import { map } from 'rxjs/operators';

import { catchError, Observable, throwError } from 'rxjs';
import { Student } from '../models/student.model';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  selectedStudent: Student[] =  [];
  Students: Student[] = [];
  url = "http://localhost:3000/students/"

  constructor(
    private http: HttpClient,
    private auth: AuthServiceService,
    private router: Router
    ) { }

    addStudent(student: any): Observable<Student> {
      this.http.post<Student>(this.url+"register_student",student)
        .subscribe(res => {
          let result = JSON.parse(JSON.stringify(res))
          console.log(result.status)
          // if (result == true) {
          //   this.setToken(result.Token)
          // }

          if (result.status == true) {
            this.router.navigate(['/teacher/students']) 
            alert(result.message)

          }else{
            alert("Message: "+result.message+",  Error: "+result.Error)
            // this.router.navigate(['admin/Home'])
          }
      })

    return throwError(new Error('Something Went Wrong'));    
  }

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
}
