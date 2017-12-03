import { Component, OnInit, Injectable } from '@angular/core';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

import { Observable } from 'rxjs/Observable';

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
    lastName: ''
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
      if (teacher.id !== undefined) {
        this.teacherService.updateTeacher(teacher);
      }else {
        this.teacherService.addTeacher(teacher);
      }
      this.teacherReset();
    }

    // console.log(classe);
  }

  teacherReset() {
    this.teacher = {
      firstName: '',
      lastName: ''
    };
    this.addSaveNtn = 'Add';
  }

}
