import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from '../../../core/models/usuario';

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

  passwordStrengthMsg = '';
  passwordStrengthClass = '';



  constructor(private router: Router) { }

  onSubmit(event: Event) {
    event.preventDefault();

    // --- Validaciones ---
    if (!this.nombre.trim() || !this.email.trim() || !this.telefono.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
      this.error = 'Por favor, completa todos los campos.';
      this.success = false;
      return;
    }

    if (!this.isPhoneValid(this.telefono)) {
      this.error = 'El número de celular no es válido (debe tener 9 dígitos).';
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

    // --- Recuperar usuarios guardados ---
    let usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Verificar si ya existe el correo
    if (usuarios.some(u => u.email === this.email)) {
      this.error = 'Este correo ya está registrado.';
      this.success = false;
      return;
    }

    const numeroid = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    // Crear nuevo usuario
    const user: Usuario = {
      id: numeroid,
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      password: this.password
    };




    // Guardar en la lista
    usuarios.push(user);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.removeItem('logueado'); // evitar que quede logueado directo

    this.success = true;

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1200);
  }

  // --- chequeo fuerza de contraseña ---
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

  // --- validador de teléfono (9 dígitos exactos para Perú) ---
  isPhoneValid(phone: string): boolean {
    const regex = /^[0-9]{9}$/;
    return regex.test(phone);
  }
}
