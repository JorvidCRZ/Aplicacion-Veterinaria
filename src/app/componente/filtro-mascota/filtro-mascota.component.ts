import { Component , EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltroAdopcion } from '../../core/models/filtro-mascota';

@Component({
  selector: 'app-filtro-mascota',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtro-mascota.component.html',
  styleUrl: './filtro-mascota.component.css',
})
export class FiltroMascotaComponent {
  @Output() filtrosCambiados = new EventEmitter<FiltroAdopcion>();
  @Output() limpiarFiltrosEvent = new EventEmitter<void>();

  // Filtros
  filtros: FiltroAdopcion = {
    especie: 'Todas las especies',
    tamano: 'Todos los tamaños',
    genero: 'Todos los géneros',
    edadMaxima: 10,
    vacunado: false,
    esterilizado: false,
    buenoConNinos: false,
    buenoConOtrasMascotas: false,
  };

  // Valores por defecto para limpiar filtros
  filtrosPorDefecto: FiltroAdopcion = {
    especie: 'Todas las especies',
    tamano: 'Todos los tamaños',
    genero: 'Todos los géneros',
    edadMaxima: 10,
    vacunado: false,
    esterilizado: false,
    buenoConNinos: false,
    buenoConOtrasMascotas: false,
  };

  onFiltroChange(): void {
    console.log('Filtro cambiado:', this.filtros);
    this.filtrosCambiados.emit(this.filtros);
  }

  onEdadChange(event: any): void {
    this.filtros.edadMaxima = parseInt(event.target.value);
    console.log('Edad máxima cambiada a:', this.filtros.edadMaxima);
    this.filtrosCambiados.emit(this.filtros);
  }

  onCheckboxChange(): void {
    console.log('Checkbox cambiado:', this.filtros);
    this.filtrosCambiados.emit(this.filtros);
  }

  limpiarFiltros(): void {
    this.filtros = { ...this.filtrosPorDefecto };
    console.log('Filtros limpiados');
    this.limpiarFiltrosEvent.emit();
  }
}
