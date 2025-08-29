import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../../core/models/card';
import { sede } from '../../../../core/models/sedes';
import { SafeUrlPipe } from "../../../../shared/pipes/safeurl.pipe";
import { CardGalleryComponent } from '../../../../shared/components/card-gallery/card-gallery.component';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CardGalleryComponent, CommonModule, SafeUrlPipe],
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

  sedes: sede[] = [
    {nombre: 'Sede Mariscal', direccion: 'Q Oconor 15012, San Juan de Lurigancho 15442', telefono: '955419067', correo: 'PSecretzMariscal@gmail.com', imagen: 'assets/sedes/sede-mariscal.webp', mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62459.548209030545!2d-77.0342889783203!3d-11.92444139999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c56fca4754a7%3A0xe97a4f2f3b72e58d!2sVETERINARIA%20PET%20SECRETS%20MARISCAL!5e0!3m2!1ses-419!2spe!4v1746329892354!5m2!1ses-419!2spe'},
    {nombre: 'Sede Paradita', direccion: '32GQ+C58, HUAROCHIRI PE, San Antonio de Chaclla 15446', telefono: '938422956',correo: 'PSecretzParadita@gmail.com', imagen: 'assets/sedes/sede-paradita.webp', mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62459.548209030545!2d-77.0342889783203!3d-11.92444139999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105db378da85d33%3A0x7ebbaf3ad8d605f0!2sVETERINARIA%20PET%20SECRETS%20PARADITA!5e0!3m2!1ses-419!2spe!4v1746329713004!5m2!1ses-419!2spe'},
    {nombre: 'Sede Jicamarca', direccion: 'Av. Huayna Cápac, HUAROCHIRI 15510', telefono: '954992473', correo: 'PSecretzJicamarca@gmail.com', imagen: 'assets/sedes/sede-jicamarca.webp', mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62459.548209030545!2d-77.0342889783203!3d-11.92444139999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105db9c852bde09%3A0xa754d9bdb55f1653!2sVETERINARIA%20PET%20SECRETS%20JICAMARCA!5e0!3m2!1ses-419!2spe!4v1746330583778!5m2!1ses-419!2spe'}
  ];
}
