import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import {AngularFirestoreModule, AngularFirestore} from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;

import { DateTimePickerModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// Components Import
import { AppComponent } from './app.component';
import { ClasseListComponent } from './classe/classe-list/classe-list.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';

import { HomeComponent } from './home/home.component';
// # Components Import

// Services Import
import { ClasseService } from './classe/classe.service';
import { SubjectService } from './subject/subject.service';
import { UserService } from './user/user.service';
import { StudentService } from './student/student.service';
import { TeacherService } from './teacher/teacher.service';
import { StudentDetailsComponent } from './student/student-details/student-details.component';

// # Services Import

@NgModule({
  declarations: [
    AppComponent,
    ClasseListComponent,
    SubjectListComponent,
    UserListComponent,
    StudentListComponent,
    TeacherListComponent,
    HomeComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    DateTimePickerModule,
    BrowserAnimationsModule
  ],
  providers: [
    ClasseService,
    SubjectService,
    UserService,
    StudentService,
    TeacherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
