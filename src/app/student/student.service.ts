import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Student } from './student';

import * as firebase from 'firebase';

@Injectable()
export class StudentService {

  studentsCollection: AngularFirestoreCollection<Student>;
  studentDocument: AngularFirestoreDocument<Student>;

  imagesFolder: any = 'profileimages';

  constructor(private afs: AngularFirestore) {
    this.studentsCollection = this.afs.collection('students', ref => {
      return ref.orderBy('lastName', 'asc');
    });
  }

  getStudents(): Observable<Student[]> {
    /*return this.studentsCollection.valueChanges();*/
    return this.studentsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Student;
        data.id = a.payload.doc.id;
        if (data.image !== '') {
          const path = `/${this.imagesFolder}/${data.id}/${data.image}`;
          const storageRef = firebase.storage().ref().child(path);
          storageRef.getDownloadURL().then(url => {
            data.image = url;
          }).catch(error => {
            // console.log('error ' + error.message);
          });
        }
        return data;
      });
    });
  }

  getStudentByID(studentID) {
    // this.afs.firestore.doc(`students/${studentID}`).get()
    /*.then(docSnapshot => {
      if (docSnapshot.exists) {
        // Doc exist
        this.studentDocument = this.afs.doc(`students/${studentID}`);
        return this.studentDocument.valueChanges();
      } else {
        return null;
      }
    });*/
    this.studentDocument = this.afs.doc(`students/${studentID}`);
    return this.studentDocument.valueChanges();
  }

  deleteImage(id, imageName) {
    const basePath = `/${this.imagesFolder}`;
    const storageRef = firebase.storage().ref();
    storageRef.child(`${basePath}/${id}/${imageName}`).delete();
  }

  addStudent(student) {
    this.studentsCollection.add(student)
      .then(_ => {
        this.studentDocument = this.afs.doc(`students/${_.id}`);
        // Create a root reference
        const storageRef = firebase.storage().ref();
        for (const selectedFile of [(<HTMLInputElement>document.getElementById('pic')).files[0]]) {
          if ( selectedFile ) {
            const path = `/${this.imagesFolder}/${_.id}/${selectedFile.name}`;
            const iRef = storageRef.child(path);
            iRef.put(selectedFile);
            student.image =  selectedFile.name;
          }
          this.studentDocument.update(student);
        }
      });
  }

  updateStudent(student) {
    // Create a root reference
    const storageRef = firebase.storage().ref();
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('pic')).files[0]]) {
      if ( selectedFile ) {
        this.deleteImage(student.id, student.image);
        const path = `/${this.imagesFolder}/${student.id}/${selectedFile.name}`;
        const iRef = storageRef.child(path);
        iRef.put(selectedFile);
        student.image =  selectedFile.name;
      }
    }

    this.studentDocument = this.afs.doc(`students/${student.id}`);
    delete student.id;
    this.studentDocument.update(student);
  }

  deleteStudent(student) {
    this.studentDocument = this.afs.doc(`students/${student.id}`);
    this.studentDocument.delete();
  }

  getStudentsName() {
    const studentsName = [];
    this.studentsCollection.valueChanges().subscribe(v => {
      v.forEach((element, index) => {
        studentsName[index] = element.firstName + ' ' + element.lastName;
      });
    });
    return studentsName;
  }

}
