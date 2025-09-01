import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../core/models/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) { }

  onSubmit(event: Event) {
    const usuariosStr = localStorage.getItem('usuarios');
    if (usuariosStr) {
      const usuarios: Usuario[] = JSON.parse(usuariosStr);
      const user = usuarios.find(u => u.email === this.email && u.password === this.password);
      if (user) {
        localStorage.setItem('logueado', 'true');
        localStorage.setItem('usuarioActivo', JSON.stringify(user));
        this.router.navigate(['/usuario']).then(() => {
          window.location.reload();
        });
      } else {
        this.error = 'Correo o contraseña incorrectos';
      }
    } else {
      this.error = 'No hay usuarios registrados';
    }
  }
}