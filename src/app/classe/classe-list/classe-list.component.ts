import { Component, OnInit, Injectable } from '@angular/core';
import { Classe } from '../classe';
import { ClasseService } from '../classe.service';


import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.css']
})
export class ClasseListComponent implements OnInit {
  classes:Observable<Classe[]>;
  classe: Classe = {
    classeName: '',
    displayName: '',
    section:'A'
  };

  addSaveNtn = 'Add';

  constructor( private classeService:ClasseService ) { }

  ngOnInit() {
    this.classes = this.classeService.getclasses();    
  }

  deleteClasse(classe) {
    if( confirm('Are you sure?') ){
      this.classeService.deleteclasse(classe);
    }
  }

  editClasse(classe) {
    this.classe = classe;
    this.addSaveNtn = 'Save';
  }

  addUpdateClasse(classe) {
    console.log(classe.id);
    if( classe.classeName != '' && classe.section != '' ) {
      if(classe.id != undefined) {
        classe.displayName = classe.classeName + ' ' + classe.section;
        this.classeService.updateclasse(classe);
        this.classeReset();
      }
      else{
        classe.displayName = classe.classeName + ' ' + classe.section;
        this.classeService.addclasse(classe);
        this.classeReset();
      }

    }
    
    //console.log(classe);
  }

  classeReset() {
        
    this.classe = {
      classeName: '',
      displayName: '',
      section:'A'
    };
    this.addSaveNtn = 'Add';
  };

}
