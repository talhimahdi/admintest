import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Teacher } from './teacher';

@Injectable()
export class TeacherService {

  teachersCollection: AngularFirestoreCollection<Teacher>;
  teacherDocument: AngularFirestoreDocument<Teacher>;

  constructor(private afs: AngularFirestore) {
    this.teachersCollection = this.afs.collection('teachers', ref => {
      return ref.orderBy('lastName', 'asc');
    });
  }

  getTeachers(): Observable<Teacher[]> {
    /*return this.teachersCollection.valueChanges();*/
    return this.teachersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Teacher;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  addTeacher(teacher) {
    this.teachersCollection.add(teacher);
  }

  updateTeacher(teacher) {
    this.teacherDocument = this.afs.doc(`teachers/${teacher.id}`);
    delete teacher.id;
    this.teacherDocument.update(teacher);
  }

  deleteTeacher(teacher) {
    this.teacherDocument = this.afs.doc(`teachers/${teacher.id}`);
    this.teacherDocument.delete();
  }

}
