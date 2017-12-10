import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';

import { Observable } from 'rxjs/Observable';
import { Classe } from '../../classe/classe';
import { Subject } from '../../subject/subject';
import { Teacher } from '../../teacher/teacher';
import { Student } from '../../student/student';
import { Assignement } from '../../assignement/assignement';

import { ClasseService } from '../../classe/classe.service';
import { SubjectService } from '../../subject/subject.service';
import { TeacherService } from '../../teacher/teacher.service';
import { StudentService } from '../../student/student.service';

import { AssignementService } from '../../assignement/assignement.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Observable<Note[]>;

  note: Note = {
    abbreviation: '',
    coef: 0,
    createdAt: '',
    updateAt: '',
    classeId: '',
    studentId: '',
    subjectId: '',
    teacherId: ''
  };


  assignements: Observable<Assignement[]>;

  classes: Observable<Classe[]>;
  subjects: Observable<Subject[]>;
  teachers: Observable<Teacher[]>;
  students: Observable<Student[]>;

  teacher: any = {
    displayName: '',
  };

  addSaveNtn = 'Add';
  assignementsCount: Number = 0;
  studentsCount: Number = 0;

  studentsList: Boolean = false;
  loadingTeachers: Boolean = true;

  teacherID: string;
  subjectID: string;
  classeID: string;

  constructor(
    private noteService: NoteService,
    private classeService: ClasseService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private assignementService: AssignementService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.notes = this.noteService.getNotes();

    this.teachers = this.teacherService.getTeachers();
    this.teachers.subscribe(result => {
      if ( result.length > 0 ) {
        this.loadingTeachers = false;
      }
    });
    // this.subjects = this.subjectService.getsubjects();
    // this.classes = this.classeService.getclasses();
  }

  getAssignementsByTeacherID(teacherID) {
    if (teacherID !== '') {
      this.assignements = this.assignementService.getAssignementsByTeacherID(teacherID);
      this.studentsList = false;
      this.teacherID = teacherID;
      this.assignements.subscribe(result => { this.assignementsCount = result.length; });
    }
  }

  studentsListByClasse(classeID, subjectID) {
    if (classeID !== '' && subjectID) {
      this.students = this.studentService.getStudentsByClasseID(classeID);
      this.studentsList = true;
      this.subjectID = subjectID;
      this.classeID = classeID;

      this.students.subscribe(result => { this.studentsCount = result.length; });
    }
  }

  hideStudentsList(teacherID) {
    if (teacherID !== '') {
      this.assignements = this.assignementService.getAssignementsByTeacherID(teacherID);
      this.studentsList = false;

      this.assignements.subscribe(result => { this.assignementsCount = result.length; });
      this.studentsList = false;
    }
  }

  addNote(student) {
    console.log('studentID: ' + student.id);
    console.log('teacherID: ' + this.teacherID);
    console.log('classeID: ' + this.classeID);
    console.log('subjectID: ' + this.subjectID);

  }

}
