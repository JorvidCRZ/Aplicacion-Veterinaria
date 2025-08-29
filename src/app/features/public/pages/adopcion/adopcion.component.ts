import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../../../core/models/mascota';
import { FiltroAdopcion } from '../../../../core/models/filtro-mascota';
import { MascotaService } from '../../../../core/services/mascota.service';
import { MascotaCardComponent } from '../../../../shared/components/mascota-card/mascota-card.component';
import { FiltroMascotaComponent } from '../../../../shared/components/filtro-mascota/filtro-mascota.component';

@Component({
  selector: 'app-adopcion',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltroMascotaComponent, MascotaCardComponent],
  templateUrl: './adopcion.component.html',
  styleUrl: './adopcion.component.css'
})
export class AdopcionComponent implements OnInit {
  mascotas: Mascota[] = [];
  mascotasFiltradas: Mascota[] = [];
  loading = true;
  error = false;
  
  // Propiedades para el modal de adopción
  mostrarModalAdopcion = false;
  mascotaSeleccionada: Mascota | null = null;
  
  // Formulario de adopción
  formularioAdopcion = {
    experiencia: '',
    tipoVivienda: '',
    otrasMascotas: '',
    horarioTrabajo: '',
    motivoAdopcion: '',
    contactoEmergencia: '',
    veterinarioReferencia: '',
    aceptaTerminos: false,
    aceptaVisita: false
  };

  constructor(private mascotaService: MascotaService) {}

  ngOnInit(): void {
    this.cargarMascotas();
  }

  cargarMascotas(): void {
    this.loading = true;
    this.error = false;
    
    this.mascotaService.getMascotas().subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
        this.mascotasFiltradas = mascotas;
        this.loading = false;
        console.log('Mascotas cargadas desde array:', mascotas);
      },
      error: (error) => {
        console.error('Error al cargar mascotas:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  onFiltrosCambiados(filtros: FiltroAdopcion): void {
    console.log('Aplicando filtros:', filtros);
    
    this.mascotaService.filtrarMascotas(filtros).subscribe({
      next: (mascotas) => {
        this.mascotasFiltradas = mascotas;
        console.log('Mascotas filtradas:', mascotas);
      },
      error: (error) => {
        console.error('Error al filtrar mascotas:', error);
        // En caso de error, mostrar todas las mascotas
        this.mascotasFiltradas = this.mascotas;
      }
    });
  }

  onLimpiarFiltros(): void {
    this.mascotasFiltradas = this.mascotas;
    console.log('Filtros limpiados, mostrando todas las mascotas');
  }

  adoptarMascota(mascota: Mascota): void {
    console.log('Adoptando mascota:', mascota.nombre);
    this.mascotaSeleccionada = mascota;
    this.mostrarModalAdopcion = true;
  }

  cerrarModalAdopcion(): void {
    this.mostrarModalAdopcion = false;
    this.mascotaSeleccionada = null;
    this.limpiarFormularioAdopcion();
  }

  limpiarFormularioAdopcion(): void {
    this.formularioAdopcion = {
      experiencia: '',
      tipoVivienda: '',
      otrasMascotas: '',
      horarioTrabajo: '',
      motivoAdopcion: '',
      contactoEmergencia: '',
      veterinarioReferencia: '',
      aceptaTerminos: false,
      aceptaVisita: false
    };
  }

  enviarSolicitudAdopcion(): void {
    console.log('Solicitud de adopción enviada:', {
      mascota: this.mascotaSeleccionada,
      formulario: this.formularioAdopcion
    });
    // Aquí se implementará la lógica para enviar la solicitud
    this.cerrarModalAdopcion();
  }
}
