import { Component, OnInit } from '@angular/core';
import { Cita } from '../../../../../core/models/cita';
import { MiCita, MiCitaCardComponent } from '../../../../../shared/components/index-dashboard-user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';

declare var bootstrap: any;

interface CitaUsuario extends Cita {
  id: string;
  estado: 'confirmada' | 'pendiente' | 'completada' | 'cancelada';
  veterinario: string;
  sede: string;
}

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, RouterModule, MiCitaCardComponent],
  templateUrl: './mis-citas.component.html',
  styleUrl: './mis-citas.component.css'
})
export class MisCitasComponent implements OnInit {
  usuarioActual: any;
  
  citas: CitaUsuario[] = [
    {
      id: '1',
      nombreCompleto: '', // Se llenará con datos del usuario actual
      telefono: '', // Se llenará con datos del usuario actual
      email: '', // Se llenará con datos del usuario actual
      nombreMascota: 'Luna',
      especie: 'Perro',
      raza: 'Golden Retriever',
      edad: '3 años',
      servicioRequerido: 'Consulta General',
      fechaPreferida: '2025-09-05',
      horaPreferida: '10:00 AM',
      notasAdicionales: 'Control de rutina y vacunas',
      estado: 'confirmada',
      veterinario: 'Dr. Carlos Mendoza',
      sede: 'Sede Jicamarca'
    },
    {
      id: '2',
      nombreCompleto: '', // Se llenará con datos del usuario actual
      telefono: '', // Se llenará con datos del usuario actual
      email: '', // Se llenará con datos del usuario actual
      nombreMascota: 'Mimi',
      especie: 'Gato',
      raza: 'Persa',
      edad: '2 años',
      servicioRequerido: 'Vacunación Anual',
      fechaPreferida: '2025-09-10',
      horaPreferida: '02:30 PM',
      notasAdicionales: 'Vacuna anual completa',
      estado: 'pendiente',
      veterinario: 'Dra. Ana García',
      sede: 'Sede La Paradita'
    },
    {
      id: '3',
      nombreCompleto: '', // Se llenará con datos del usuario actual
      telefono: '', // Se llenará con datos del usuario actual
      email: '', // Se llenará con datos del usuario actual
      nombreMascota: 'Luna',
      especie: 'Perro',
      raza: 'Golden Retriever',
      edad: '3 años',
      servicioRequerido: 'Desparasitación',
      fechaPreferida: '2025-08-15',
      horaPreferida: '11:00 AM',
      notasAdicionales: 'Desparasitación completa y chequeo general',
      estado: 'completada',
      veterinario: 'Dr. Carlos Mendoza',
      sede: 'Sede Mariscal'
    },
    {
      id: '4',
      nombreCompleto: '', // Se llenará con datos del usuario actual
      telefono: '', // Se llenará con datos del usuario actual
      email: '', // Se llenará con datos del usuario actual
      nombreMascota: 'Max',
      especie: 'Perro',
      raza: 'Labrador',
      edad: '5 años',
      servicioRequerido: 'Cirugía Menor',
      fechaPreferida: '2025-09-15',
      horaPreferida: '09:00 AM',
      notasAdicionales: 'Extracción de quiste en pata',
      estado: 'confirmada',
      veterinario: 'Dr. Luis Rodríguez',
      sede: 'Sede Jicamarca'
    }
  ];

  citasProximas: CitaUsuario[] = [];
  historialCitas: CitaUsuario[] = [];
  citaSeleccionada: CitaUsuario | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Obtener datos del usuario actual
    this.usuarioActual = this.authService.getCurrentUser();
    
    // Actualizar las citas con los datos del usuario actual
    this.actualizarDatosUsuario();
    
    this.organizarCitas();
  }

  private actualizarDatosUsuario(): void {
    // Los datos del propietario siempre deben ser del usuario actual logueado
    if (this.usuarioActual) {
      this.citas.forEach(cita => {
        cita.nombreCompleto = this.usuarioActual.nombre || 'Usuario Actual';
        cita.email = this.usuarioActual.email || '';
        cita.telefono = this.usuarioActual.telefono || '';
      });
    }
  }

  organizarCitas(): void {
    const hoy = new Date();
    
    this.citasProximas = this.citas.filter(cita => {
      const fechaCita = new Date(cita.fechaPreferida);
      return fechaCita >= hoy && (cita.estado === 'confirmada' || cita.estado === 'pendiente');
    });

    this.historialCitas = this.citas.filter(cita => {
      const fechaCita = new Date(cita.fechaPreferida);
      return fechaCita < hoy || cita.estado === 'completada' || cita.estado === 'cancelada';
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'confirmada': return 'bg-success';
      case 'pendiente': return 'bg-warning';
      case 'completada': return 'bg-info';
      case 'cancelada': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getEstadoLabel(estado: string): string {
    switch (estado) {
      case 'confirmada': return 'Confirmada';
      case 'pendiente': return 'Pendiente';
      case 'completada': return 'Completada';
      case 'cancelada': return 'Cancelada';
      default: return estado;
    }
  }

  cancelarCita(cita: CitaUsuario | MiCita): void {
    const nombre = 'nombreMascota' in cita ? cita.nombreMascota : (cita as any).nombreMascota;
    if (confirm(`¿Estás seguro de cancelar la cita de ${nombre}?`)) {
      if ('estado' in cita) {
        (cita as CitaUsuario).estado = 'cancelada';
        this.organizarCitas();
      }
    }
  }

  reprogramarCita(cita: CitaUsuario): void {
    // Redirigir a formulario de reprogramación
    console.log('Reprogramar cita:', cita.id);
  }

  verDetallesCita(cita: MiCita): void {
    // Encontrar la cita completa usando el ID
    this.citaSeleccionada = this.citas.find(c => c.id === cita.id) || null;
    
    if (this.citaSeleccionada) {
      // Abrir el modal usando Bootstrap
      setTimeout(() => {
        const modalElement = document.getElementById('modalDetallesCita');
        if (modalElement && typeof bootstrap !== 'undefined') {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      }, 100);
    }
  }

  formatearFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  transformCita(cita: CitaUsuario): MiCita {
    return {
      id: cita.id,
      nombreMascota: cita.nombreMascota,
      servicioRequerido: cita.servicioRequerido,
      fechaPreferida: new Date(cita.fechaPreferida),
      horaPreferida: cita.horaPreferida,
      veterinario: cita.veterinario,
      estado: cita.estado,
      observaciones: cita.notasAdicionales
    };
  }
}
