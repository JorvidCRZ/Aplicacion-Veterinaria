import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Slide } from '../../../core/models/slide';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  slides: Slide[] = [
    {
      id: 1,
      image: 'assets/carrusel/banner/slide1.webp',
      title: 'Cuidado Veterinario Integral',
      description: 'Amor más puro\nviene con cuatro patas'
    },
    {
      id: 2,
      image: 'assets/carrusel/banner/slide2.webp',
      title: 'Productos de calidad',
      description: 'Salud y bienestar para\ntu mejor amigo'
    },
    {
      id: 3,
      image: 'assets/carrusel/banner/slide3.webp',
      title: 'Adopta una mascota',
      description: 'Porque ellos merecen\n el mejor cuidado'
    }
  ];
}

