import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MiAdopcion, MiAdopcionCardComponent } from '../../../../../shared/components/mi-adopcion-card/mi-adopcion-card.component';
import { Adopcion } from '../../../../../core/models/dashboard';
import { AuthService } from '../../../../../core/services/auth.service';

declare var bootstrap: any;


@Component({
  selector: 'app-mis-adopciones',
  standalone: true,
  imports: [CommonModule, RouterModule, MiAdopcionCardComponent],
  templateUrl: './mis-adopciones.component.html',
  styleUrl: './mis-adopciones.component.css'
})
export class MisAdopcionesComponent implements OnInit {
  adopcionSeleccionada: any = null;
  usuarioActual: any;

  constructor(private authService: AuthService) {}
  
  adopciones: any[] = [
    {
      id: '1',
      nombreMascota: 'Max',
      raza: 'Pastor Alemán',
      edad: '3 años',
      imagenMascota: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107444/pastor_aleman2_dvgj7n.jpg',
      fecha: '2025-08-20',
      estado: 'pendiente',
      mensaje: 'Tu solicitud está being revisada por nuestro equipo.',
      // Datos del formulario de adopción (se llenarán automáticamente con datos del usuario)
      nombreSolicitante: '', // Se llenará con datos del usuario actual
      email: '', // Se llenará con datos del usuario actual
      telefono: '', // Se llenará con datos del usuario actual
      experiencia: 'Intermedia - He tenido mascotas por 5 años',
      tipoVivienda: 'Casa con patio grande',
      otrasMascotas: 'Sí, tengo un gato persa de 2 años llamado Michi',
      horarioTrabajo: '9:00 AM - 5:00 PM, trabajo presencial',
      motivacion: 'Quiero adoptar a Max porque busco un compañero leal y activo. Tengo experiencia con perros grandes y creo que puedo brindarle el amor y cuidado que necesita.',
      contactoEmergencia: 'María González - 987-654-321',
      veterinario: 'Clínica Veterinaria San Martín - 456-789-123',
      aceptaTerminos: true,
      aceptaVisita: true
    },
    {
      id: '2',
      nombreMascota: 'Bella',
      raza: 'Golden Retriever',
      edad: '2 años',
      imagenMascota: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107458/golden_retriever4_zmspzs.jpg',
      fecha: '2025-07-15',
      estado: 'aprobado',
      mensaje: '¡Felicidades! Tu solicitud ha sido aprobada. Puedes venir a recoger a Bella.',
      // Datos del formulario de adopción (se llenarán automáticamente con datos del usuario)
      nombreSolicitante: '', // Se llenará con datos del usuario actual
      email: '', // Se llenará con datos del usuario actual
      telefono: '', // Se llenará con datos del usuario actual
      experiencia: 'Avanzada - He criado Golden Retrievers por 10 años',
      tipoVivienda: 'Casa con jardín amplio y cercado',
      otrasMascotas: 'No, sería mi primera mascota en esta casa',
      horarioTrabajo: 'Home office - horario flexible',
      motivacion: 'Bella sería perfecta para mi familia. Tengo experiencia con esta raza y puedo ofrecerle mucho amor y cuidados especializados.',
      contactoEmergencia: 'Carlos García - 999-888-777',
      veterinario: 'Clínica Veterinaria Los Ángeles - 555-666-777',
      aceptaTerminos: true,
      aceptaVisita: true
    },
    {
      id: '3',
      nombreMascota: 'Rocky',
      raza: 'Bulldog Francés',
      edad: '4 años',
      imagenMascota: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107436/buldog1_dpcjtc.jpg',
      fecha: '2025-06-10',
      estado: 'rechazado',
      mensaje: 'Lamentablemente, Rocky ya ha sido adoptado por otra familia.',
      // Datos del formulario de adopción (se llenarán automáticamente con datos del usuario)
      nombreSolicitante: '', // Se llenará con datos del usuario actual
      email: '', // Se llenará con datos del usuario actual
      telefono: '', // Se llenará con datos del usuario actual
      experiencia: 'Principiante - Sería mi primera mascota',
      tipoVivienda: 'Departamento pequeño en segundo piso',
      otrasMascotas: 'No tengo otras mascotas',
      horarioTrabajo: '8:00 AM - 6:00 PM, trabajo presencial',
      motivacion: 'Siempre he querido tener un perro y Rocky me parece perfecto para comenzar esta experiencia.',
      contactoEmergencia: 'Carmen Rodríguez - 456-789-123',
      veterinario: 'Clínica Veterinaria Central - 789-123-456',
      aceptaTerminos: true,
      aceptaVisita: false
    }
  ];

  ngOnInit(): void {
    // Obtener datos del usuario actual
    this.usuarioActual = this.authService.getCurrentUser();
    
    // Actualizar las adopciones con los datos del usuario actual
    this.actualizarDatosUsuario();
  }

  private actualizarDatosUsuario(): void {
    // La información del solicitante siempre debe ser del usuario actual logueado
    if (this.usuarioActual) {
      this.adopciones.forEach(adopcion => {
        adopcion.nombreSolicitante = this.usuarioActual.nombre || 'Usuario Actual';
        adopcion.email = this.usuarioActual.email || '';
        adopcion.telefono = this.usuarioActual.telefono || '';
      });
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'aprobado': return 'bg-success';
      case 'pendiente': return 'bg-warning';
      case 'rechazado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getEstadoLabel(estado: string): string {
    switch (estado) {
      case 'aprobado': return 'Aprobado';
      case 'pendiente': return 'En Revisión';
      case 'rechazado': return 'Rechazado';
      default: return estado;
    }
  }

  getEstadoIcon(estado: string): string {
    switch (estado) {
      case 'aprobado': return 'bi-check-circle-fill';
      case 'pendiente': return 'bi-clock-fill';
      case 'rechazado': return 'bi-x-circle-fill';
      default: return 'bi-question-circle-fill';
    }
  }

  cancelarSolicitud(adopcion: Adopcion): void {
    if (confirm(`¿Estás seguro de cancelar la solicitud de adopción de ${adopcion.nombreMascota}?`)) {
      // Aquí implementarías la lógica para cancelar la solicitud
      console.log('Cancelar solicitud:', adopcion.id);
    }
  }

  verDetallesAdopcion(adopcion: MiAdopcion): void {
    // Encontrar la adopción completa usando el ID
    this.adopcionSeleccionada = this.adopciones.find(a => a.id === adopcion.id) || null;
    
    if (this.adopcionSeleccionada) {
      // Abrir el modal usando Bootstrap
      setTimeout(() => {
        const modalElement = document.getElementById('modalDetallesAdopcion');
        if (modalElement && typeof bootstrap !== 'undefined') {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      }, 100);
    }
  }

  cancelarSolicitudAdopcion(adopcion: MiAdopcion): void {
    if (confirm(`¿Estás seguro de cancelar la solicitud de adopción de ${adopcion.nombreMascota}?`)) {
      console.log('Cancelar solicitud:', adopcion.id);
      // Implementar lógica para cancelar la solicitud
    }
  }

  formatearFecha(fecha: string): string {
    const partes = fecha.split('-');
    const fechaLocal = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
    
    return fechaLocal.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  transformAdopcion(adopcion: any): MiAdopcion {
    return {
      id: adopcion.id,
      nombreMascota: adopcion.nombreMascota,
      raza: adopcion.raza || 'No especificada',
      edad: adopcion.edad ? parseInt(adopcion.edad) : 0,
      foto: adopcion.imagenMascota,
      fechaSolicitud: new Date(adopcion.fecha),
      estado: adopcion.estado === 'aprobado' ? 'aprobada' : adopcion.estado,
      observaciones: adopcion.mensaje
    };
  }

}
