import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClasseListComponent } from './classe/classe-list/classe-list.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: HomeComponent
  },
  {
    path: 'classes',
    component: ClasseListComponent
  },
  {
    path: 'subjects',
    component: SubjectListComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'teachers',
    component: TeacherListComponent
  },
  {
    path: 'students',
    component: StudentListComponent
  },
  {
    path: 'students/details/:id',
    component: StudentDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
