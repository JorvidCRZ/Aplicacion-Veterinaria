import { Component } from '@angular/core';
import { Testimonio } from '../../../core/models/testimonio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {
testimonios: Testimonio[] = [
    {
      id: 1,
      nombre: 'Laura González',
      descripcion: 'La atención fue increíble, cuidaron a mi perrita como si fuera de su familia. ¡Gracias Pets Secretz!',
      mascota: 'Luna',
      imagen: 'assets/dueños/ama-perro.webp',
      estrellas: 5
    },
    {
      id: 2,
      nombre: 'Pedro Martínez',
      descripcion: 'Muy profesionales y amables. Mi gato recibió la mejor atención durante su cirugía.',
      mascota: 'Michi',
      imagen: 'assets/dueños/amo-gato.webp',
      estrellas: 5
    },
    {
      id: 3,
      nombre: 'Ana Torres',
      descripcion: 'Siempre llevo a mis mascotas aquí. Los doctores son excelentes y el lugar muy limpio.',
      mascota: 'Rocky y Pelusa',
      imagen: 'assets/dueños/ama-mascota.webp',
      estrellas: 5
    }
  ];
}
