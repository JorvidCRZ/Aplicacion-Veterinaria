import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptedTerms: boolean = false;

  error: string = '';
  success: boolean = false;

  showPassword = false;
  showConfirm = false;

  // fuerza de contraseña
  passwordStrengthMsg = '';
  passwordStrengthClass = '';

  constructor(private router: Router) { }

  onSubmit(event: Event) {
    event.preventDefault();

    // Validación básica
    if (!this.nombre.trim() || !this.email.trim() || !this.telefono.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
      this.error = 'Por favor, completa todos los campos.';
      this.success = false;
      return;
    }

    // Validar teléfono
    if (!this.isPhoneValid(this.telefono)) {
      this.error = 'El número de celular no es válido (8 a 15 dígitos).';
      this.success = false;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      this.success = false;
      return;
    }

    if (!this.acceptedTerms) {
      this.error = 'Debes aceptar los términos y condiciones.';
      this.success = false;
      return;
    }

    this.error = '';

    // Guardar usuario en localStorage
    const user = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      password: this.password
    };
    localStorage.setItem('usuario', JSON.stringify(user));
    localStorage.removeItem('logueado');

    this.success = true;

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1200);
  }

  // chequeo fuerza de contraseña
  checkPasswordStrength(password: string) {
    if (!password) {
      this.passwordStrengthMsg = '';
      this.passwordStrengthClass = '';
      return;
    }

    if (password.length < 6) {
      this.passwordStrengthMsg = 'Muy débil';
      this.passwordStrengthClass = 'text-danger';
    } else if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[^a-zA-Z0-9]/)) {
      this.passwordStrengthMsg = 'Fuerte';
      this.passwordStrengthClass = 'text-success';
    } else {
      this.passwordStrengthMsg = 'Aceptable';
      this.passwordStrengthClass = 'text-warning';
    }
  }

  // --- validador de teléfono ---
  isPhoneValid(phone: string): boolean {
    const regex = /^[0-9]{8,15}$/; // Solo números, de 8 a 15 dígitos
    return regex.test(phone);
  }
}
