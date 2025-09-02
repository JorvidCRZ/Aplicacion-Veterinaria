import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../core/models/usuario';
import { AuthService } from '../../../core/services/auth.service';

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

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit(event: Event) {
    const usuariosStr = localStorage.getItem('usuarios');
    if (usuariosStr) {
      const usuarios: Usuario[] = JSON.parse(usuariosStr);
      const user = usuarios.find(u => u.email === this.email && u.password === this.password);
      if (user) {
        // Usuario autenticado correctamente
        this.authService.setLoggedIn(user);
        
        // Verificar si hay una ruta de redirección guardada
        const redirectTo = this.authService.getRedirectAfterLogin();
        
        if (redirectTo) {
          // Limpiar la ruta de redirección y navegar
          this.authService.clearRedirectAfterLogin();
          this.router.navigate([redirectTo]);
        } else {
          // Navegar al dashboard del usuario por defecto
          this.router.navigate(['/usuario']);
        }
      } else {
        this.error = 'Correo o contraseña incorrectos';
      }
    } else {
      this.error = 'No hay usuarios registrados';
    }
  }
}