import { Component } from '@angular/core';
import { PersonEntity } from '../models/person-entity';
import { SexEntity } from '../models/sex-entity';
import { TypeEntity } from '../models/type-entity';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonService } from '../service/person.service';
import { TypeService } from 'src/app/type/service/type.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {

  data:any[]=[];
  person:PersonEntity[]=[];
  sex:SexEntity[]=[];
  type:TypeEntity[]=[];
  selectedPerson: PersonEntity | undefined
  
  frmPerson = new FormGroup({
    idPersona: new FormControl(''),
    nomPersona: new FormControl(''),
    aplPersona: new FormControl(''),
    dniPersona: new FormControl(''),
    celuPersona: new FormControl(''),
    correoPersona: new FormControl(''),
    fnaciPersona: new FormControl(''),
    activoPersona: new FormControl(''),
    idTipo: new FormControl(0),
    idSexo: new FormControl(0)
  })

  constructor(private personService: PersonService, private typeService: TypeService, private router:Router){}
  
  ngOnInit(): void {
    this.listAllInactive();
  }

  listAllInactive(){
    this.personService.listInactivePerson().subscribe(person=>{
      this.person=person;
    })
  }

  listAllPerson(){
    this.personService.listAllPerson().subscribe(person=>{
      this.person=person
    })
  }

  
  deleteHardPerson(codigo:number){
    this.personService.deleteHardperson(codigo).subscribe(person=>{
      this.listAllInactive();
    })
  }

  navigateToEmpleado() {
    this.router.navigate(['/empleado']);
  }
  
  activatePerson(codigo: number) {
    this.personService.activatePerson(codigo).subscribe(person => {
      this.listAllInactive();
    });
  }
}
