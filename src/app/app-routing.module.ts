import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PersonComponent } from './person/person.component';
import { TablesComponent } from './person/tables/tables.component';

const routes: Routes = [
  {path: 'empleado', component: PersonComponent},
  {path: 'empleado/inactivos', component: TablesComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
