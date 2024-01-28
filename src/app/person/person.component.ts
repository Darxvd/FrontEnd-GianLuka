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

  constructor(private personService: PersonService, private typeService: TypeService){}

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

  deleteSoftPerson(codigo:number){
    this.personService.deleteSoftPerson(codigo).subscribe(person => {
      this.listAllActive();
    })
  }






  ngOnInit(): void {
    this.listAllActive();
    this.listSex();
    this.listType();
  }

}
