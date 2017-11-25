import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClasseListComponent } from './classe/classe-list/classe-list.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { MatiereComponent } from './matiere/matiere.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: HomeComponent
  },
  {
    path: 'classes',
    component: ClasseListComponent
  },
  {
    path: 'professeurs',
    component: ProfesseurComponent
  },
  {
    path: 'etudiants',
    component: EtudiantComponent
  },
  {
    path: 'matieres',
    component: MatiereComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
