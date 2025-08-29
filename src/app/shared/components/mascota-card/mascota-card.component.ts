import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mascota } from '../../../core/models/mascota';

@Component({
  selector: 'app-mascota-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mascota-card.component.html',
  styleUrl: './mascota-card.component.css'
})
export class MascotaCardComponent {
  @Input() mascota!: Mascota;
  @Output() adoptarMascotaEvent = new EventEmitter<Mascota>();

  adoptarMascota(): void {
    console.log('Adoptando mascota:', this.mascota.nombre);
    this.adoptarMascotaEvent.emit(this.mascota);
  }

}
