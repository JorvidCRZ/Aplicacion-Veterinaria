import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MiMascota {
  id: string;
  nombre: string;
  raza: string;
  edad: number;
  foto: string;
  fechaRegistro: Date;
  proximaCita?: Date;
}

@Component({
  selector: 'app-mi-mascota-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-mascota-card.component.html',
  styleUrl: './mi-mascota-card.component.css'
})
export class MiMascotaCardComponent {
  @Input() mascota!: MiMascota;
  @Output() agendarCita = new EventEmitter<MiMascota>();
  @Output() editar = new EventEmitter<MiMascota>();



  onAgendarCita(): void {
    this.agendarCita.emit(this.mascota);
  }

  onEditar(): void {
    this.editar.emit(this.mascota);
  }
}
