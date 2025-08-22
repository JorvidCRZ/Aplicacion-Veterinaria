import { Component, ElementRef, ViewChild } from '@angular/core';
import { BannerComponent } from '../../componente/banner/banner.component';
import { CarruselComponent } from '../../componente/carrusel/carrusel.component';
import { ComentariosComponent } from '../../componente/comentarios/comentarios.component';
import { RouterLink } from "@angular/router";
import { CardGalleryComponent } from '../../componente/card-gallery/card-gallery.component';
import { Card } from '../../core/models/card';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [BannerComponent, CarruselComponent, ComentariosComponent, RouterLink, CardGalleryComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  @ViewChild('imagen') imagen!: ElementRef<HTMLImageElement>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.imagen.nativeElement.classList.add('visible');
          }
        });
      },
      { threshold: 0.5 }
    );

    if (this.imagen) {
      observer.observe(this.imagen.nativeElement);
    }
  }

  servicios: Card[] = [
    { id: 1, title: 'Peluquería', description: 'Ofrecemos cortes de pelo, baños especiales y tratamientos de belleza para que tu mascota luzca increíble.', image: 'assets/galeria/expertos/peluqueria.webp' },
    { id: 2, title: 'Baños', description: 'Baños higiénicos y medicados, adaptados a las necesidades de cada raza y tipo de pelaje.', image: 'assets/galeria/expertos/baño.webp' },
    { id: 3, title: 'Vacunaciones', description: 'Protegemos la salud de tu mascota aplicando todas las vacunas necesarias, con control y seguimiento personalizado.', image: 'assets/galeria/expertos/vacuna.webp' },
    { id: 4, title: 'Cirugías', description: 'Realizamos cirugías generales y de alta complejidad con tecnología de punta y cuidados pre y postoperatorios.', image: 'assets/galeria/expertos/cirugia.webp' }
  ];

  title: string = 'Somos un equipo de expertos en...';

}
