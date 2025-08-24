import { Component } from '@angular/core';
import { Card } from '../../core/models/card';
import { CardGalleryComponent } from '../../componente/card-gallery/card-gallery.component';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CardGalleryComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {
  equipo: Card[] = [
    { id: 1, title: 'Dr. Juan Pérez', description: 'Veterinario General', image: 'assets/galeria/veterinarios/veterinario1.webp' },
    { id: 2, title: 'Dra. Carla Ramos', description: 'Especialista en felinos', image: 'assets/galeria/veterinarios/veterinario2.webp' },
    { id: 3, title: 'Lucía Torres', description: 'Asistente veterinaria', image: 'assets/galeria/veterinarios/veterinario3.webp' },
    { id: 4, title: 'Laura Sánchez', description: 'Groomer profesional', image: 'assets/galeria/veterinarios/veterinario4.webp' },
    { id: 5, title: 'Miguel Ruiz', description: 'Auxiliar de clínica', image: 'assets/galeria/veterinarios/veterinario5.webp' },
    { id: 6, title: 'Dra. Elena Vargas', description: 'Nutricionista veterinaria', image: 'assets/galeria/veterinarios/veterinario6.webp' },
    { id: 7, title: 'Pedro León', description: 'Especialista en comportamiento canino', image: 'assets/galeria/veterinarios/veterinario7.webp' },
    { id: 8, title: 'Sofía Mendoza', description: 'Técnica de laboratorio clínico', image: 'assets/galeria/veterinarios/veterinario8.webp' },
    { id: 9, title: 'Carla Díaz', description: 'Administradora de la clínica', image: 'assets/galeria/veterinarios/veterinario9.webp' },
    { id: 10, title: 'Daniela López', description: 'Recepcionista', image: 'assets/galeria/veterinarios/veterinario10.webp' },
    { id: 11, title: 'Laura Gómez', description: 'Asistente Veterinaria', image: 'assets/galeria/veterinarios/veterinario11.webp' },
    { id: 12, title: 'Carlos Méndez', description: 'Entrenador Canino', image: 'assets/galeria/veterinarios/veterinario12.webp' },
    { id: 13, title: 'Carolina Aguirre', description: 'Auxiliar de clínica', image: 'assets/galeria/veterinarios/veterinario13.webp' },
    { id: 14, title: 'Sofía Contreras', description: 'Asistente Veterinaria', image: 'assets/galeria/veterinarios/veterinario14.webp' },
    { id: 15, title: 'Esther Munivez', description: 'Veterinario General', image: 'assets/galeria/veterinarios/veterinario15.webp' }
  ];
}
