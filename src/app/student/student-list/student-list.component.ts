import { Component, OnInit, Injectable } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  section_name = 'Students';

  students: Observable<Student[]>;
  student: Student = {
    firstName: '',
    lastName: '',
    image: '',
    birthday: '',
    email: '',
    address: '',
    gender: '',
  };

  addSaveNtn = 'Add';

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.students = this.studentService.getStudents();
  }

  deleteStudent(student) {
    if (confirm('Are you sure?')) {
      this.studentService.deleteStudent(student);
      if (student.id === this.student.id) {
        this.studentReset();
      }
    }
  }

  editStudent(student) {
    this.student = student;
    this.addSaveNtn = 'Save';
  }

  addUpdateStudent(student) {
    if (student.firstName !== '' && student.lastName !== '') {
      if (student.birthday !== '') {
        student.birthday = moment(student.birthday).format('YYYY-MM-DD');
      }

      if (student.id !== undefined) {
        this.studentService.updateStudent(student);
      } else {
        this.studentService.addStudent(student);
      }
      this.studentReset();
    }
    // console.log();
  }

  studentReset() {
    this.student = {
      firstName: '',
      lastName: '',
      image: '',
      birthday: '',
      email: '',
      address: '',
      gender: '',
    };
    this.addSaveNtn = 'Add';
  }

}
