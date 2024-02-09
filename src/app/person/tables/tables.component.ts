import { Component } from '@angular/core';
import { PersonEntity } from '../models/person-entity';
import { SexEntity } from '../models/sex-entity';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonService } from '../service/person.service';
import { TypeService } from 'src/app/type/service/type.service';
import { Route, Router } from '@angular/router';
import { TypeEntity } from 'src/app/type/models/type-entity';

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
    this.listSex();
    this.listType();
  }

  listAllInactive(){
    this.personService.listInactivePerson().subscribe(person=>{
      this.person=person;
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
    
  deleteHardPerson(codigo:number){
    this.personService.deleteHardperson(codigo).subscribe(person=>{
      this.listAllInactive();
    })
  }

  navigateToEmpleado() {
    this.router.navigate(['/home/empleado']);
  }
  
  activatePerson(codigo: number) {
    this.personService.activatePerson(codigo).subscribe(person => {
      this.listAllInactive();
    });
  }

  findNameInactive() {
    const nombreControl = this.frmPerson.get('nomPersona');
    if (nombreControl) {
      const nombre = nombreControl.value!;
      this.personService.nombre = "" + nombre;
      
      if (nombre == "") {
        this.listAllInactive();
      } else {
        this.personService.findNameInactive("" + nombre).subscribe(person => {
          this.person = person;
        });
      }
    }
  }

  findByTypePersonInactive() {
    const type = this.frmPerson.controls['idTipo'].value;
    if (type === 0 || type === null) {
      this.listAllInactive();
    } else {
      const typeNumber = parseInt("" + type, 10);
      this.personService.findTypePersonInactive(typeNumber).subscribe(person => {
        this.person = person;
      });
    }
  }

}
