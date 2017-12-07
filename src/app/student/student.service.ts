import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Student } from './student';
import { User } from '../user/user';

import * as firebase from 'firebase';
import { Classe } from '../classe/classe';

import { _ } from 'underscore';

@Injectable()
export class StudentService {
  studentsCollection: AngularFirestoreCollection<Student>;
  studentDocument: AngularFirestoreDocument<Student>;

  usersCollection: AngularFirestoreCollection<User>;
  userDocument: AngularFirestoreDocument<User>;

  student: Student;

  constructor(private afs: AngularFirestore) {
    this.studentsCollection = this.afs.collection('students', ref => {
      return ref.orderBy('lastName', 'asc');
    });

    this.usersCollection = this.afs.collection('users');
  }

  getStudents(): Observable<Student[]> {
    return this.studentsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Student;
        data.id = a.payload.doc.id;
        this.afs.doc(`users/${data.uid}`).valueChanges().subscribe((user: User) => {
          data.email = user.email;
          data.photoURL = user.photoURL;
        });

        /*this.afs.doc(`classes/${data.classeId}`).valueChanges().subscribe((classe: Classe) => {
          data.classeId = classe.displayName;
        });*/
        return data;
      });
    });
  }

  getStudentByID(studentID) {
    let selectedStudent;

    this.studentsCollection.valueChanges().subscribe(res => {
      selectedStudent = _.where(res, {id: studentID});

      console.log(res);
    });

    /*const queryObservable = this.afs.collection('students', ref => ref.where('id', '==', studentID))
          .valueChanges();

    return queryObservable.map((Items: Student[]) => {
        return Items;
    });*/

    /*return this.studentsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        if (a.payload.doc.id === studentID) {
          const data = a.payload.doc.data() as Student;
          data.id = a.payload.doc.id;
          this.afs.doc(`users/${data.uid}`).valueChanges().subscribe((ab: User) => {
            data.email = ab.email;
            data.photoURL = ab.photoURL;
            data.displayName = ab.displayName;
          });
          return data;
        }

      });
    });*/
  }

  addStudent(student) {
    // Add User First
    const newUser: User = {
      displayName: '',
      email: '',
      photoURL: '',
      role: ''
    };
    newUser.displayName = student.firstName + ' ' + student.lastName;
    newUser.email = student.email;
    newUser.role = 'Etudiant';

    this.usersCollection.add(newUser).then(_ => {
      this.userDocument = this.afs.doc(`users/${_.id}`);
      for (const selectedFile of [(<HTMLInputElement>document.getElementById('pic')).files[0]]) {
        if (selectedFile) {
          const storageRef = firebase.storage().ref().child('/profileimages/' + _.id);
          storageRef.put(selectedFile).then(file => {
            storageRef.getDownloadURL().then(url => {
              newUser.photoURL = url;
              this.userDocument.update(newUser);
            });
          });
        }
      }

      // Then Add Student
      delete student.displayName;
      delete student.email;
      delete student.role;
      delete student.photoURL;
      student.uid = _.id;

      this.studentsCollection.add(student);

    });
  }

  updateStudent(student) {
    // Update User First
    const user: User = {
      displayName: '',
      email: ''
    };
    this.userDocument = this.afs.doc(`users/${student.uid}`);
    user.displayName = student.firstName + ' ' + student.lastName;
    user.email = student.email;

    for (const selectedFile of [(<HTMLInputElement>document.getElementById('pic')).files[0]]) {
      if ( selectedFile ) {
        if (student.photoURL !== '') {
          // Delete Old Photo and Add the new photo
          firebase.storage().ref().child('/profileimages/' + student.uid).delete().then(res => {
            const newPhotostorageRef = firebase.storage().ref().child('/profileimages/' + student.uid);
            newPhotostorageRef.put(selectedFile).then(file => {
              newPhotostorageRef.getDownloadURL().then(url => {
                user.photoURL = url;
                this.userDocument.update(user);
              });
            });
          });
        } else {
          // Add the New Photo
          const newPhotostorageRef = firebase.storage().ref().child('/profileimages/' + student.uid);
          newPhotostorageRef.put(selectedFile).then(file => {
            newPhotostorageRef.getDownloadURL().then(url => {
              user.photoURL = url;
              this.userDocument.update(user);
            });
          });
        }
      }
    }

    // Then Update Student
    this.studentDocument = this.afs.doc(`students/${student.id}`);

    delete student.displayName;
    delete student.email;
    delete student.role;
    delete student.photoURL;
    delete student.id;

    this.studentDocument.update(student);
  }

  deleteStudent(student) {
    if (student.id && student.uid) {
      this.userDocument = this.afs.doc(`users/${student.uid}`);
      this.userDocument.delete();
      this.studentDocument = this.afs.doc(`students/${student.id}`);
      this.studentDocument.delete();
      if (student.photoURL !== '') {
        firebase.storage().ref().child('/profileimages/' + student.uid).delete();
      }
    }
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

  getStudentsByClasseID(classeID): Observable<Student[]> {
    const queryObservable = this.afs.collection('students', ref => ref.where('classeId', '==', classeID)).valueChanges();

    return queryObservable.map((Items: Student[]) => {
        return Items;
    });
  }

}
