import { Component, OnInit } from '@angular/core';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

import { Observable } from 'rxjs/Observable';

import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  section_name = 'Teachers';

  teachers: Observable<Teacher[]>;
  teacher: Teacher = {
    firstName: '',
    lastName: '',
    birthday: '',
    address: '',
    gender: '',
    displayName: '',
    email: ''
  };

  addSaveNtn = 'Add';

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teachers = this.teacherService.getTeachers();
  }

  deleteTeacher(teacher) {
    if (confirm('Are you sure?')) {
      this.teacherService.deleteTeacher(teacher);
      if (teacher.id === this.teacher.id) {
        this.teacherReset();
      }

    }
  }

  editTeacher(teacher) {
    this.teacher = teacher;
    this.addSaveNtn = 'Save';
  }

  addUpdateTeacher(teacher) {
    if (teacher.firstName !== '' && teacher.lastName !== '') {
      if (teacher.birthday !== '') {
        teacher.birthday = moment(teacher.birthday).format('YYYY-MM-DD');
      }
      if (teacher.id !== undefined) {
        this.teacherService.updateTeacher(teacher);
      }else {
        this.teacherService.addTeacher(teacher);
      }
      this.teacherReset();
    }
  }

  teacherReset() {
    this.teacher = {
      firstName: '',
      lastName: '',
      birthday: '',
      address: '',
      gender: '',
      displayName: '',
      email: ''
    };
    this.addSaveNtn = 'Add';
  }

}
