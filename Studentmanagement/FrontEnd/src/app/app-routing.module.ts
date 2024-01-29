import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginRegisterComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'teacher',
    canActivate: [AuthGuard],
    loadChildren: () => 
    import('./module/teacher/teacher.module')
    .then((m)=>m.TeacherModule)
  },
  {
    path: 'student',
    canActivate: [AuthGuard],
    loadChildren: () => 
    import('./module/student/student.module')
    .then((m)=>m.StudentModule)
  }
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
