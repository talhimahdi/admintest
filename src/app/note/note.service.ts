import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Note } from './note';


@Injectable()
export class NoteService {
  notesCollection: AngularFirestoreCollection<Note>;
  noteDocument: AngularFirestoreDocument<Note>;

  note: Note;

  constructor(private afs: AngularFirestore) {
    this.notesCollection = this.afs.collection('notes');
    /*this.assignementsCollection.valueChanges().subscribe(res => {
      console.log(res);
    });*/
  }

  getNotes(): Observable<Note[]> {
    return this.notesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Note;
        data.id = a.payload.doc.id;
        // console.log(data);
        return data;
      });
    });
  }

}
