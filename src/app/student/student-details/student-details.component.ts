import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  studentID;
  student: Student;

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentID = params.id;
    });
    if (this.studentID !== '') {
      // call getStudentByID
      this.studentService.getStudentByID(this.studentID);
      /*this.studentService.getStudentByID(this.studentID).subscribe(Doc => {
        // this.student = Doc[1];
        console.log(Doc);
      });*/
    }
  }

}
