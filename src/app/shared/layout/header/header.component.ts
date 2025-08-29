import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../../core/models/menu-item';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  menuItems: MenuItem[] = [
    { label: 'Inicio', route: '/inicio', exact: true },
    { label: 'Nosotros', route: '/nosotros' },
    { label: 'Servicios', route: '/servicios' },
    { label: 'Productos', route: '/productos' },
    { label: 'Adopción', route: '/adopcion' }
  ];



  logueado: boolean = false;
  nombreUsuario: string | null = null;

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    const log = localStorage.getItem('logueado');
    this.logueado = log === 'true';
    if (this.logueado) {
      const userStr = localStorage.getItem('usuario');
      if (userStr) {
        const user = JSON.parse(userStr);
        this.nombreUsuario = user.nombre;
      }
    } else {
      this.nombreUsuario = null;
    }
  }

  cerrarSesion() {
    localStorage.removeItem('logueado');
    localStorage.removeItem('usuario');
    this.checkLogin();
    window.location.href = '/usuario';
  }
}
