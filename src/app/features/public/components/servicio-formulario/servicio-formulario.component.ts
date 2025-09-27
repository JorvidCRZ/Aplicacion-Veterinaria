import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Cita } from '../../../../core/models/cita';

@Component({
  selector: 'app-servicio-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicio-formulario.component.html',
  styleUrl: './servicio-formulario.component.css'
})
export class ServicioFormularioComponent implements OnInit {
  
  constructor(private router: Router) {}

  cita: Cita = {
    nombreCompleto: '',
    telefono: '',
    email: '',
    nombreMascota: '',
    especie: '',
    raza: '',
    edad: '',
    servicioRequerido: '',
    sede: '',
    fechaPreferida: '',
    horaPreferida: '',
    notasAdicionales: ''
  };

  servicios = [
    'Odontología',
    'Medicina felina',
    'Ecografías',
    'Cirugías',
    'Consultas médicas',
    'Internamientos',
    'Cardiología',
    'Emergencias',
    'Endoscopia',
    'Oftalmología',
    'Traumatología',
    'Oncología',
    'Nutrición',
    'Anestesia inhalatoria',
    'Laboratorio',
    'Baños y cortes'
  ];

  horas = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '03:00 PM',
    '04:00 PM'
  ];

  especies = ['Perro', 'Gato'];

  sedes = [
    'Sede Mariscal',
    'Sede Paradita', 
    'Sede Jicamarca'
  ];

  ngOnInit(): void {
    // Verificar si hay datos prellenados desde localStorage
    const datosGuardados = localStorage.getItem('datosPrellenos');
    if (datosGuardados) {
      try {
        const datos = JSON.parse(datosGuardados);
        
        // Prellenar los campos del formulario
        this.cita.nombreCompleto = datos.nombreCompleto || '';
        this.cita.telefono = datos.telefono || '';
        this.cita.email = datos.email || '';
        this.cita.nombreMascota = datos.nombreMascota || '';
        this.cita.especie = datos.especie || '';
        this.cita.raza = datos.raza || '';
        this.cita.edad = datos.edad || '';
        
        // Limpiar los datos temporales del localStorage
        localStorage.removeItem('datosPrellenos');
      } catch (error) {
        console.error('Error al procesar datos prellenados:', error);
      }
    }
  }

  onSubmit() {
    console.log('Formulario enviado:', this.cita);
    // Botón sin funcionalidad - solo visual
  }
}
