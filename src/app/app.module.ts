import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import {AngularFirestoreModule, AngularFirestore} from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClasseListComponent } from './classe/classe-list/classe-list.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { MatiereComponent } from './matiere/matiere.component';

import { ClasseService } from './classe/classe.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClasseListComponent,
    ProfesseurComponent,
    EtudiantComponent,
    MatiereComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [ClasseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
