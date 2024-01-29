import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherModule } from '../teacher/teacher.module';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { HomeComponent } from './components/home/home.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  { path: '', component: HomeComponent, 
    children:
    [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: ViewComponent},
      {path: 'add', component: AddComponent},
      {path: 'edit/:id', component: EditComponent},
      {path: 'teachers', component: TeachersComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }