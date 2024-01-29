import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonService } from './service/person.service';
import { Route, Router } from '@angular/router';
import { PersonEntity } from './models/person-entity';
import { SexEntity } from './models/sex-entity';
import { TypeService } from '../type/service/type.service';
import { TypeEntity } from './models/type-entity';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  data:any[]=[];
  person:PersonEntity[]=[];
  sex:SexEntity[]=[];
  type:TypeEntity[]=[];
  selectedPerson: PersonEntity | undefined;
  
  frmPerson = new FormGroup({
    idPersona: new FormControl(''),
    nomPersona: new FormControl(''),
    aplPersona: new FormControl(''),
    dniPersona: new FormControl(''),
    celuPersona: new FormControl(''),
    correoPersona: new FormControl(''),
    fnaciPersona: new FormControl(''),
    idTipo: new FormControl(0),
    idSexo: new FormControl(0)
  })

  loadPersonDataForUpdate(person: PersonEntity) {
    this.selectedPerson = person;
    
    this.frmPerson.patchValue({
      idPersona: person.idPersona ? person.idPersona.toString() : '',
      nomPersona: person.nomPersona,
      aplPersona: person.aplPersona,
      dniPersona: person.dniPersona,
      celuPersona: person.celuPersona,
      correoPersona: person.correoPersona,
      fnaciPersona: person.fnaciPersona,
      idTipo: person.objType.idTipo,
      idSexo: person.objSex.idSexo
    });
  }

  
  constructor(private personService: PersonService, private typeService: TypeService){}
  
  ngOnInit(): void {
    this.listAllActive();
    this.listSex();
    this.listType();
  }

  listAllActive(){
    this.personService.listActivePerson().subscribe(person=>{
      this.person=person;
      console.log("Sigan viendo");
    })
  }

  listSex(){
    this.personService.listSex().subscribe(data=>{
      this.sex=data;
    })
  }

  listType(){
    this.typeService.listActivType().subscribe(type=>{
      this.type=type;
    })
  }

  registerOrUpdatePerson() {
    const personData = this.frmPerson.value;
    this.personService.saveOrUpdatePerson(personData).subscribe(res => {
      this.frmPerson.reset();

      const idSexoControl = this.frmPerson.get('idSexo');
      const idTipoControl = this.frmPerson.get('idTipo');
  
      if (idSexoControl && idTipoControl) {
        idSexoControl.setValue(0);
        idTipoControl.setValue(0);
      }
      this.listAllActive();
    });
  }

  deleteSoftPerson(codigo:number){
    this.personService.deleteSoftPerson(codigo).subscribe(person => {
      this.listAllActive();
    })
  }







}
