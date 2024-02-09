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

  user: LoginEntity = new LoginEntity();
  errorMessage: string = '';

  constructor(private router: Router, private loginService: LoginService) { }

  onSubmit() {
    this.loginService.login(this.user).subscribe(
      (response: LoginEntity) => {
        // Inicio de sesión exitoso
        console.log("Inicio de sesión exitoso:", response);
        this.router.navigate(['home']);
      },
      (error) => {
        // Inicio de sesión no exitoso
        console.log("Inicio de sesión no exitoso:", error);

        // Verifica si el error es debido a que el usuario no fue encontrado (código de estado 404)
        if (error.status === 404) {
          this.errorMessage = "Usuario no encontrado";
        } else {
          // Otro tipo de error, redirige a la página de inicio de sesión
          this.errorMessage = "Error desconocido";
          this.router.navigate(['/login']);
        }
      }
    );
  }
  
}
