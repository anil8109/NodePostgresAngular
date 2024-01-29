import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/edit/edit.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { AddComponent } from './components/add/add.component';
import { ViewComponent } from './components/view/view.component';
import { MatTableModule } from "@angular/material/table";
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { StudentsComponent } from './components/students/students.component';
import { EditstudentsComponent } from './components/editstudents/editstudents.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    HeaderComponent,
    HomeComponent,
    ViewComponent,
    StudentsComponent,
    EditstudentsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TeacherModule { }
