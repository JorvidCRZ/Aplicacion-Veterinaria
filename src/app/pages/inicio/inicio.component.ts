import { Component, ElementRef, ViewChild } from '@angular/core';
import { BannerComponent } from '../../componente/banner/banner.component';
import { CarruselComponent } from '../../componente/carrusel/carrusel.component';
import { ComentariosComponent } from '../../componente/comentarios/comentarios.component';
import { RouterLink } from "@angular/router";
import { CardGalleryComponent } from '../../componente/card-gallery/card-gallery.component';


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
}
