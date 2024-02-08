import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { LoginEntity } from './models/login-entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: LoginEntity = new LoginEntity(); // Cambiado a objeto en lugar de array

  constructor(private router: Router, private loginService: LoginService) { }

  onSubmit() {
    // Llama al servicio de login con la instancia de LoginEntity
    this.loginService.login(this.user).subscribe(
      (response) => {
        console.log("Inicio de sesión exitoso:", response);
        // Puedes realizar acciones adicionales después de iniciar sesión, si es necesario
        this.router.navigate(['home']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
  
        // Puedes mostrar un mensaje de error al usuario si lo deseas
        // this.toastr.error('Error al iniciar sesión', 'Error');
      }
    );
  }
}
