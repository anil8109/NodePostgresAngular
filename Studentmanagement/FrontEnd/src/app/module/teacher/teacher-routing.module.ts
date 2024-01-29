import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { EditstudentsComponent } from './components/editstudents/editstudents.component';
import { HomeComponent } from './components/home/home.component';
import { StudentsComponent } from './components/students/students.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  { path: '', component: HomeComponent, 
    children:
    [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: ViewComponent},
      {path: 'add', component: AddComponent},
      {path: 'edit/:id', component: EditComponent},
      {path: 'editStudent/:id', component: EditstudentsComponent},
      {path: 'students', component: StudentsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }