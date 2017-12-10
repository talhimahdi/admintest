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
  studentID: string;
  student: Observable<Student>;
  showImage: Boolean = false;

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentID = params.id;
      this.student = this.studentService.getStudentByID(this.studentID);
    });
    /*if (this.studentID !== '') {
      // call getStudentByID
      this.studentService.getStudentByID(this.studentID).subscribe((std: Student) => {
        this.student = std;
        console.log(std);
      });
    }*/
  }

}
