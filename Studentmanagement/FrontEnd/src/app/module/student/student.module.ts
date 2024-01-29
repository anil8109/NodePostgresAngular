import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/edit/edit.component';
import { StudentRoutingModule } from './student-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { AddComponent } from './components/add/add.component';
import { ViewComponent } from './components/view/view.component';
import { MatTableModule } from "@angular/material/table";
import { FilteredPipe } from '../student/components/view/filtered.pipe';
import { ShortenPipe } from '../student/components/view/shorten.pipe';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { TeachersComponent } from './components/teachers/teachers.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    EditComponent,
    HeaderComponent,
    AddComponent,
    ViewComponent,
    FilteredPipe,
    ShortenPipe,
    TeachersComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
