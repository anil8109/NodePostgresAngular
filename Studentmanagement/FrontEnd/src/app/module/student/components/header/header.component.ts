import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthServiceService) { }
  imgPath: string = "assets/images/logo.jpg"
  ngOnInit(): void {
  }

  logout(){
    this.auth.logout()
  }
}
