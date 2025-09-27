import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SolicitudAdopcion {
  id: number;
  mascota: {
    nombre: string;
    raza: string;
    edad: string;
    sexo: string;
    imagen: string;
  };
  solicitante: {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
  };
  detalles: {
    experiencia: string;
    tipoVivienda: string;
    horarioTrabajo: string;
    contactoEmergencia: string;
    veterinarioReferencia: string;
    mensaje: string;
    mensajeAdicional?: string;
  };
  aceptaciones: {
    terminosCondiciones: boolean;
    visitaDomiciliaria: boolean;
  };
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
  fecha: string;
  fechaSolicitud: string;
  ultimaActualizacion: string;
}

@Component({
  selector: 'app-adopciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adopciones.component.html',
  styleUrl: './adopciones.component.css'
})
export class AdopcionesComponent implements OnInit {
  solicitudes: SolicitudAdopcion[] = [];
  solicitudesFiltradas: SolicitudAdopcion[] = [];
  searchTerm: string = '';
  filtroEstado: string = '';
  mostrarModal: boolean = false;
  solicitudSeleccionada: SolicitudAdopcion | null = null;

  // Estadísticas
  stats = {
    totalSolicitudes: 0,
    solicitudesPendientes: 0,
    solicitudesAprobadas: 0,
    solicitudesRechazadas: 0
  };

  ngOnInit(): void {
    this.cargarSolicitudes();
    this.calcularEstadisticas();
  }

  cargarSolicitudes(): void {
    // Datos de ejemplo - En un caso real se cargarían del backend
    this.solicitudes = [
      {
        id: 1,
        mascota: {
          nombre: 'Luna',
          raza: 'Golden Retriever',
          edad: '2 años',
          sexo: 'Hembra',
          imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107458/golden_retriever4_zmspzs.jpg'
        },
        solicitante: {
          nombre: 'Juan Pérez',
          email: 'juan@email.com',
          telefono: '934567891',
          direccion: 'Avenida Central 456'
        },
        detalles: {
          experiencia: 'Algo de experiencia',
          tipoVivienda: 'Casa con patio',
          horarioTrabajo: '9:00 AM - 5:00 PM, trabajo desde casa 2 días a la semana',
          contactoEmergencia: 'Ana Pérez - +1234567892',
          veterinarioReferencia: 'Dr. Carlos Mendoza - +1234567893',
          mensaje: 'Siempre he querido tener un perro grande y Luna parece perfecta para nuestra familia. Tenemos un patio grande y mucho amor para dar.',
          mensajeAdicional: 'Me encantaría adoptar a Luna. Tengo experiencia con perros grandes.'
        },
        aceptaciones: {
          terminosCondiciones: true,
          visitaDomiciliaria: true
        },
        estado: 'Pendiente',
        fecha: '21/1/2024',
        fechaSolicitud: '21/1/2024, 19:00:00',
        ultimaActualizacion: '21/1/2024, 19:00:00'
      },
      {
        id: 2,
        mascota: {
          nombre: 'Milo',
          raza: 'Siamés',
          edad: '1 año',
          sexo: 'Macho',
          imagen: 'assets/mascotas/milo.webp'
        },
        solicitante: {
          nombre: 'María González',
          email: 'maria@email.com',
          telefono: '934337894',
          direccion: 'Calle Los Robles 123'
        },
        detalles: {
          experiencia: 'Mucha experiencia',
          tipoVivienda: 'Departamento',
          horarioTrabajo: '8:00 AM - 6:00 PM',
          contactoEmergencia: 'Carlos González - 934567895',
          veterinarioReferencia: 'Dra. Ana López - 934567999',
          mensaje: 'Siempre he tenido gatos y me encanta cuidarlos. Milo sería una gran adición a mi hogar.',
          mensajeAdicional: 'Tengo experiencia cuidando gatos siameses'
        },
        aceptaciones: {
          terminosCondiciones: true,
          visitaDomiciliaria: true
        },
        estado: 'Aprobada',
        fecha: '19/1/2024',
        fechaSolicitud: '19/1/2024, 15:30:00',
        ultimaActualizacion: '20/1/2024, 10:15:00'
      },
      {
        id: 3,
        mascota: {
          nombre: 'Bella',
          raza: 'Labrador',
          edad: '3 años',
          sexo: 'Hembra',
          imagen: 'assets/mascotas/bella.webp'
        },
        solicitante: {
          nombre: 'Carlos Ruiz',
          email: 'carlos@email.com',
          telefono: '938867897',
          direccion: 'Urbanización El Sol 789'
        },
        detalles: {
          experiencia: 'Poca experiencia',
          tipoVivienda: 'Casa pequeña',
          horarioTrabajo: '7:00 AM - 9:00 PM',
          contactoEmergencia: 'Laura Ruiz - 934567898',
          veterinarioReferencia: 'Dr. Pedro Martín - 934567779',
          mensaje: 'Me gustaría tener una mascota para mi familia.',
          mensajeAdicional: 'Primera vez adoptando'
        },
        aceptaciones: {
          terminosCondiciones: true,
          visitaDomiciliaria: false
        },
        estado: 'Rechazada',
        fecha: '17/1/2024',
        fechaSolicitud: '17/1/2024, 12:00:00',
        ultimaActualizacion: '18/1/2024, 14:30:00'
      }
    ];
    
    this.solicitudesFiltradas = [...this.solicitudes];
  }

  calcularEstadisticas(): void {
    this.stats.totalSolicitudes = this.solicitudes.length;
    this.stats.solicitudesPendientes = this.solicitudes.filter(s => s.estado === 'Pendiente').length;
    this.stats.solicitudesAprobadas = this.solicitudes.filter(s => s.estado === 'Aprobada').length;
    this.stats.solicitudesRechazadas = this.solicitudes.filter(s => s.estado === 'Rechazada').length;
  }

  filtrarSolicitudes(): void {
    let resultado = [...this.solicitudes];

    // Filtrar por término de búsqueda
    if (this.searchTerm.trim()) {
      const busqueda = this.searchTerm.toLowerCase();
      resultado = resultado.filter(solicitud =>
        solicitud.mascota.nombre.toLowerCase().includes(busqueda) ||
        solicitud.solicitante.nombre.toLowerCase().includes(busqueda) ||
        solicitud.solicitante.email.toLowerCase().includes(busqueda)
      );
    }

    // Filtrar por estado
    if (this.filtroEstado && this.filtroEstado !== '') {
      resultado = resultado.filter(solicitud => solicitud.estado === this.filtroEstado);
    }

    this.solicitudesFiltradas = resultado;
  }

  verSolicitud(solicitud: SolicitudAdopcion): void {
    this.solicitudSeleccionada = solicitud;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.solicitudSeleccionada = null;
  }

  aprobarSolicitud(): void {
    if (this.solicitudSeleccionada) {
      this.solicitudSeleccionada.estado = 'Aprobada';
      this.solicitudSeleccionada.ultimaActualizacion = new Date().toLocaleString('es-ES');
      this.actualizarSolicitudes();
      this.calcularEstadisticas();
      this.cerrarModal();
    }
  }

  rechazarSolicitud(): void {
    if (this.solicitudSeleccionada) {
      this.solicitudSeleccionada.estado = 'Rechazada';
      this.solicitudSeleccionada.ultimaActualizacion = new Date().toLocaleString('es-ES');
      this.actualizarSolicitudes();
      this.calcularEstadisticas();
      this.cerrarModal();
    }
  }

  private actualizarSolicitudes(): void {
    // Aquí se actualizarían en el backend
    this.filtrarSolicitudes();
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Pendiente': return 'estado-pendiente';
      case 'Aprobada': return 'estado-aprobada';
      case 'Rechazada': return 'estado-rechazada';
      default: return '';
    }
  }
}