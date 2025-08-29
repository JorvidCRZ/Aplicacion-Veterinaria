import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.email === this.email && user.password === this.password) {
        localStorage.setItem('logueado', 'true');
        this.error = '';
        this.router.navigate(['/usuario']);
      } else {
        this.error = 'Correo o contraseña incorrectos';
      }
    } else {
      this.error = 'No existe un usuario registrado con ese correo';
    }
  }
}
