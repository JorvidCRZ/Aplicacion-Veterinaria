import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<{isLoggedIn: boolean, user: Usuario | null}>({
    isLoggedIn: this.isLoggedIn(),
    user: this.getCurrentUser()
  });

  public authState$ = this.authState.asObservable();

  constructor(private router: Router) { }

  /**
   * Verifica si el usuario está logueado
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('logueado') === 'true';
  }

  /**
   * Obtiene el usuario activo
   */
  getCurrentUser(): Usuario | null {
    const userStr = localStorage.getItem('usuarioActivo');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Verifica si el usuario está autenticado y redirige al login si no lo está
   * @param redirectTo - Ruta a la que redirigir después del login (opcional)
   * @returns true si está autenticado, false si no
   */
  requireAuth(redirectTo?: string): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      // Guardar la ruta de destino para redirigir después del login
      if (redirectTo) {
        localStorage.setItem('redirectAfterLogin', redirectTo);
      }
      this.router.navigate(['/login']);
      return false;
    }
  }

  /**
   * Obtiene la ruta de redirección después del login
   */
  getRedirectAfterLogin(): string | null {
    return localStorage.getItem('redirectAfterLogin');
  }

  /**
   * Limpia la ruta de redirección después del login
   */
  clearRedirectAfterLogin(): void {
    localStorage.removeItem('redirectAfterLogin');
  }

  /**
   * Actualiza el estado de autenticación
   */
  private updateAuthState(): void {
    this.authState.next({
      isLoggedIn: this.isLoggedIn(),
      user: this.getCurrentUser()
    });
  }

  /**
   * Establece el usuario como logueado
   */
  setLoggedIn(user: Usuario): void {
    localStorage.setItem('logueado', 'true');
    localStorage.setItem('usuarioActivo', JSON.stringify(user));
    this.updateAuthState();
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    localStorage.setItem('logueado', 'false');
    localStorage.removeItem('usuarioActivo');
    localStorage.removeItem('redirectAfterLogin');
    this.updateAuthState();
    this.router.navigate(['/login']);
  }
}
