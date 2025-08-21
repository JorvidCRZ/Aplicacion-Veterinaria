import { Component } from '@angular/core';
import { Card } from '../../core/models/card';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';


@Component({
  selector: 'app-card-gallery',
  standalone: true,
  imports: [CommonModule,CardComponent],
  templateUrl: './card-gallery.component.html',
  styleUrl: './card-gallery.component.css'
})
export class CardGalleryComponent {
  servicios: Card[] = [
    { id: 1, title: 'Peluquería', description: 'Ofrecemos cortes de pelo, baños especiales y tratamientos de belleza para que tu mascota luzca increíble.', image: 'assets/galeria/expertos/peluqueria.webp' },
    { id: 2, title: 'Baños', description: 'Baños higiénicos y medicados, adaptados a las necesidades de cada raza y tipo de pelaje.', image: 'assets/galeria/expertos/baño.webp' },
    { id: 3, title: 'Vacunaciones', description: 'Protegemos la salud de tu mascota aplicando todas las vacunas necesarias, con control y seguimiento personalizado.', image: 'assets/galeria/expertos/vacuna.webp' },
    { id: 4, title: 'Cirugías', description: 'Realizamos cirugías generales y de alta complejidad con tecnología de punta y cuidados pre y postoperatorios.', image: 'assets/galeria/expertos/cirugia.webp' }
  ];

}
