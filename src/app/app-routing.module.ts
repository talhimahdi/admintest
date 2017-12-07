import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClasseListComponent } from './classe/classe-list/classe-list.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';

import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { TeacherDetailsComponent } from './teacher/teacher-details/teacher-details.component';
import { ClasseSlotsListComponent } from './classe-slots/classe-slots-list/classe-slots-list.component';
import { AssignementListComponent } from './assignement/assignement-list/assignement-list.component';
import { NoteListComponent } from './note/note-list/note-list.component';

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
    path: 'classes_slots',
    component: ClasseSlotsListComponent
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
    path: 'teachers/details/:id',
    component: TeacherDetailsComponent
  },
  {
    path: 'students',
    component: StudentListComponent
  },
  {
    path: 'students/details/:id',
    component: StudentDetailsComponent
  },
  {
    path: 'assignements',
    component: AssignementListComponent
  },
  {
    path: 'notes',
    component: NoteListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
