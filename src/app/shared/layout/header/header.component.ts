import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
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

export class HeaderComponent implements OnDestroy {menuItems: MenuItem[] = [
    { label: 'Inicio', route: '/inicio', exact: true },
    { label: 'Nosotros', route: '/nosotros' },
    { label: 'Servicios', route: '/servicios' },
    { label: 'Productos', route: '/productos' },
    { label: 'Adopción', route: '/adopcion' }
  ];

  logueado: boolean = false;
  nombreUsuario: string | null = null;
  userEmail: string | null = null;
  isAdmin: boolean = false;
  private userSub?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.logueado = !!user;
      this.nombreUsuario = (user && ('name' in user) ? user.name : (user as any)?.nombre) || null;
      this.userEmail = user?.email || null;
      this.isAdmin = user?.rol === 'admin';
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }

  getUserEmail(): string {
    return this.userEmail || '';
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
