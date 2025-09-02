import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../../core/models/menu-item';
import { Usuario } from '../../../core/models/usuario';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [
    { label: 'Inicio', route: '/inicio', exact: true },
    { label: 'Nosotros', route: '/nosotros' },
    { label: 'Servicios', route: '/servicios' },
    { label: 'Productos', route: '/productos' },
    { label: 'Adopción', route: '/adopcion' }
  ];

  logueado: boolean = false;
  usuarioActivo: Usuario | null = null;
  private authSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Suscribirse a los cambios del estado de autenticación
    this.authSubscription = this.authService.authState$.subscribe(authState => {
      this.logueado = authState.isLoggedIn;
      this.usuarioActivo = authState.user;
      console.log('Header actualizado - Estado de login:', this.logueado, 'Usuario:', this.usuarioActivo);
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  cerrarSesion() {
    this.authService.logout();
  }
}

