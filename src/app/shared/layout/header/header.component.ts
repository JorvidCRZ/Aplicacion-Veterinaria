import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../../core/models/menu-item';
import { Usuario } from '../../../core/models/usuario';

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
  usuarios: Usuario[] = [];
  usuarioActivo: Usuario | null = null;

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    const log = localStorage.getItem('logueado');
    this.logueado = log === 'true';

    const usersStr = localStorage.getItem('usuarios');
    this.usuarios = usersStr ? JSON.parse(usersStr) as Usuario[] : [];

    const userActivoStr = localStorage.getItem('usuarioActivo');
    this.usuarioActivo = userActivoStr ? JSON.parse(userActivoStr) as Usuario : null;
  }

  cerrarSesion() {
    localStorage.setItem('logueado', 'false');
    localStorage.removeItem('usuarioActivo');
    this.usuarioActivo = null;
    this.logueado = false;
    window.location.href = '/login';
  }
}

