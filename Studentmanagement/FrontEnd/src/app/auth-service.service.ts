import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url = ""
  constructor(private router: Router, private http: HttpClient) { }
  loginerror = '';
  setToken(token: string): void {
    localStorage.setItem('token', token)
  }
  setTime(time: string): void {
    var currentDateTime = new Date();
    var resultInSeconds = currentDateTime.getTime() / 1000;

    localStorage.setItem('tokenTime', time)
    localStorage.setItem('loginTime', <any> resultInSeconds)
  }
  setRole(role: string): void {
    localStorage.setItem('role', role)
  }
  compareTime(){
    var currentDateTime = new Date();
    var resultInSeconds = currentDateTime.getTime() / 1000;

    console.log(resultInSeconds,<any> localStorage.getItem("loginTime"),(resultInSeconds - <any> localStorage.getItem("loginTime")) > <any> localStorage.getItem("tokenTime"))

    return (resultInSeconds - <any> localStorage.getItem("loginTime")) > <any> localStorage.getItem("tokenTime")? false : true;
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }

  isLoggedIn(){
    if (this.getToken() != null) {
      if (this.compareTime()) {
        return true;
      }
    }
    return false;
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate([''])
  }

  login(data: any): Observable<any> {
    this.url = "http://localhost:3000/authTeacher/login"
    this.http.post(this.url,data)
    .subscribe(res => {
      let result = JSON.parse(JSON.stringify(res))
      console.log(result.message)

      if (result.status == true) {
        this.setToken(result.Token)
        this.setTime(result.expiresIn)
        // this.setRole(role: string)
        this.router.navigate(['teacher'])
      }else{

        this.url = "http://localhost:3000/auth/login"

        this.http.post(this.url,data).subscribe(res => {
          let result = JSON.parse(JSON.stringify(res))
          console.log(result.status)

          if (result.status == true) {
            this.setToken(result.Token)
            this.setTime(result.expiresIn)
            this.router.navigate(['student'])
          }else{
            alert('Invalid Credentials')
            this.router.navigate([''])
          }
        })
      }
    })

    return throwError(new Error('Enter Valid Credentials')); 

  }
}

