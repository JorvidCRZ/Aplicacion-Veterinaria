import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mascota } from '../models/mascota';
import { FiltroAdopcion } from '../models/filtro-mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  // Datos provenientes del antiguo db.json
  private mascotas: Mascota[] = [
    {
      id: 1,
      nombre: 'Luna',
      especie: 'Perro',
      raza: 'Golden Retriever',
      genero: 'Hembra',
      edad: 2,
      tamano: 'Grande',
      descripcion: 'Luna es una perrita muy cariñosa y juguetona. Le encanta pasear y jugar con pelotas.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107458/golden_retriever4_zmspzs.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2024-01-15'
    },
    {
      id: 2,
      nombre: 'Rocky',
      especie: 'Perro',
      raza: 'Bulldog',
      genero: 'Macho',
      edad: 3,
      tamano: 'Mediano',
      descripcion: 'Rocky es tranquilo y leal. Le gusta descansar y recibir cariño, ideal para un hogar relajado.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107436/buldog1_dpcjtc.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: true,
      buenoConOtrasMascotas: false,
      fechaIngreso: '2025-02-10'
    },
    {
      id: 3,
      nombre: 'Max',
      especie: 'Perro',
      raza: 'Pastor Alemán',
      genero: 'Macho',
      edad: 5,
      tamano: 'Grande',
      descripcion: 'Max es un perro inteligente y protector, perfecto para familias activas. Le encanta correr al aire libre.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107444/pastor_aleman2_dvgj7n.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2025-03-05'
    },
    {
      id: 4,
      nombre: 'Duke',
      especie: 'Perro',
      raza: 'Labrador Retriever',
      genero: 'Macho',
      edad: 3,
      tamano: 'Grande',
      descripcion: 'Duke es juguetón, sociable y muy cariñoso. Siempre está listo para acompañar a su familia en cualquier aventura.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107449/labrador_retriever_3_lz1r6q.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2024-03-20'
    },
    {
      id: 5,
      nombre: 'Nala',
      especie: 'Perro',
      raza: 'Husky Siberiano',
      genero: 'Hembra',
      edad: 4,
      tamano: 'Grande',
      descripcion: 'Nala es una husky llena de energía y muy cariñosa. Le encanta correr y jugar con la nieve.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107467/husky_siberiano_5_chz83p.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: false,
      fechaIngreso: '2024-04-02'
    },
    {
      id: 6,
      nombre: 'Toby',
      especie: 'Perro',
      raza: 'Beagle',
      genero: 'Macho',
      edad: 3,
      tamano: 'Mediano',
      descripcion: 'Toby es curioso y siempre está olfateando todo a su alrededor. Es alegre y le encanta explorar.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107475/beagle_6_jjqbmd.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2024-04-15'
    },
    {
      id: 7,
      nombre: 'Mia',
      especie: 'Perro',
      raza: 'Poodle',
      genero: 'Hembra',
      edad: 5,
      tamano: 'Pequeño',
      descripcion: 'Mia es obediente e inteligente. Le encanta aprender trucos nuevos y dar paseos cortos.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107483/poodle_7_qhpij2.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2025-05-01'
    },
    {
      id: 8,
      nombre: 'Coco',
      especie: 'Perro',
      raza: 'Chihuahua',
      genero: 'Macho',
      edad: 3,
      tamano: 'Pequeño',
      descripcion: 'Coco es pequeño pero valiente. Siempre alerta y con mucha personalidad, ideal para compañía cercana.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107490/chihuahua_8_bzlzpi.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: false,
      buenoConOtrasMascotas: false,
      fechaIngreso: '2023-05-10'
    },
    {
      id: 9,
      nombre: 'Bruno',
      especie: 'Perro',
      raza: 'Pug',
      genero: 'Macho',
      edad: 4,
      tamano: 'Pequeño',
      descripcion: 'Bruno es alegre y simpático. Le gusta estar cerca de las personas y recibir caricias todo el día.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107496/pug_9_zbgdrh.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2023-05-22'
    },
    {
      id: 10,
      nombre: 'Kira',
      especie: 'Perro',
      raza: 'Rottweiler',
      genero: 'Hembra',
      edad: 5,
      tamano: 'Grande',
      descripcion: 'Kira es fuerte y muy protectora. Ideal para una familia con espacio amplio y amor para darle.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107502/rottweiler_10_bjxvre.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: true,
      buenoConOtrasMascotas: false,
      fechaIngreso: '2025-06-01'
    },
    {
      id: 11,
      nombre: 'Bobby',
      especie: 'Perro',
      raza: 'Bichon Frise',
      genero: 'Macho',
      edad: 2,
      tamano: 'Pequeño',
      descripcion: 'Bobby es un perrito alegre y juguetón. Le encanta estar con niños y correr en el parque.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107510/bichon_frise_11_hyfgcc.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2024-06-12'
    },
    {
      id: 12,
      nombre: 'Lola',
      especie: 'Perro',
      raza: 'Pomerania',
      genero: 'Hembra',
      edad: 2,
      tamano: 'Pequeño',
      descripcion: 'Lola es una bolita de pelos llena de energía y ternura. Ideal para compañía dentro de casa.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107518/pomerania_12_tt99fv.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: true,
      buenoConOtrasMascotas: false,
      fechaIngreso: '2025-06-20'
    },
    {
      id: 13,
      nombre: 'Zeus',
      especie: 'Perro',
      raza: 'Bull Terrier',
      genero: 'Macho',
      edad: 1,
      tamano: 'Mediano',
      descripcion: 'Zeus es activo y muy enérgico. Le encantan los juegos al aire libre y es muy leal a su familia.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107525/bull_terrier_13_ztlr9j.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: true,
      buenoConOtrasMascotas: false,
      fechaIngreso: '2023-07-05'
    },
    {
      id: 14,
      nombre: 'Sasha',
      especie: 'Perro',
      raza: 'Salchicha',
      genero: 'Hembra',
      edad: 3,
      tamano: 'Pequeño',
      descripcion: 'Sasha es tierna y divertida, con un carácter muy amigable. Ideal para hogares con niños.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107534/salchicha_14_fh1suw.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2024-07-15'
    },
    {
      id: 15,
      nombre: 'Thor',
      especie: 'Perro',
      raza: 'San Bernardo',
      genero: 'Macho',
      edad: 6,
      tamano: 'Grande',
      descripcion: 'Thor es noble y tranquilo. A pesar de su tamaño, es muy cariñoso y paciente con los niños.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107542/san_bernando_15_rgnk0l.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2025-07-25'
    },
    {
      id: 16,
      nombre: 'Rex',
      especie: 'Perro',
      raza: 'Doberman',
      genero: 'Macho',
      edad: 4,
      tamano: 'Grande',
      descripcion: 'Rex es un perro protector y muy obediente. Ideal como guardián y compañero fiel.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107550/doberman_16_maq1aa.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: false,
      buenoConOtrasMascotas: false,
      fechaIngreso: '2023-08-01'
    },
    {
      id: 17,
      nombre: 'Mishi',
      especie: 'Gato',
      raza: 'Siames',
      genero: 'Hembra',
      edad: 3,
      tamano: 'Mediano',
      descripcion: 'Mishi es muy cariñosa y le encanta dormir cerca de las personas. Siempre busca compañía.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107558/siames_17_xzwjyk.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2024-01-20'
    },
    {
      id: 18,
      nombre: 'Tom',
      especie: 'Gato',
      raza: 'Persa',
      genero: 'Macho',
      edad: 2,
      tamano: 'Pequeño',
      descripcion: 'Tom es muy calmado y le gusta descansar en lugares cómodos. Ideal para un hogar tranquilo.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107565/persa_18_vhnftk.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: false,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2025-02-15'
    },
    {
      id: 19,
      nombre: 'Lila',
      especie: 'Gato',
      raza: 'Esfinge',
      genero: 'Hembra',
      edad: 4,
      tamano: 'Mediano',
      descripcion: 'Lila es curiosa, elegante y siempre busca atención. Le gusta seguir a las personas por la casa.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107572/esfinge_19_amsqd1.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: false,
      fechaIngreso: '2024-03-01'
    },
    {
      id: 20,
      nombre: 'Simba',
      especie: 'Gato',
      raza: 'Ragdoll',
      genero: 'Macho',
      edad: 3,
      tamano: 'Grande',
      descripcion: 'Simba es tranquilo y muy dócil. Se adapta fácilmente y disfruta de los brazos de su dueño.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107581/ragdoll_20_kesqgf.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2025-03-10'
    },
    {
      id: 21,
      nombre: 'Nina',
      especie: 'Gato',
      raza: 'Americano',
      genero: 'Hembra',
      edad: 5,
      tamano: 'Mediano',
      descripcion: 'Nina es independiente pero cariñosa. Le gusta pasar tiempo mirando por la ventana.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107589/americano_21_wkqu8l.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: false,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2024-03-25'
    },
    {
      id: 22,
      nombre: 'Leo',
      especie: 'Gato',
      raza: 'Toyger',
      genero: 'Macho',
      edad: 1,
      tamano: 'Mediano',
      descripcion: 'Leo es muy juguetón y ágil. Le gusta trepar y siempre busca nuevas aventuras.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107596/toyger_22_quogyd.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: true,
      buenoConOtrasMascotas: false,
      fechaIngreso: '2023-04-05'
    },
    {
      id: 23,
      nombre: 'Cleo',
      especie: 'Gato',
      raza: 'Bombay',
      genero: 'Hembra',
      edad: 3,
      tamano: 'Pequeño',
      descripcion: 'Cleo es elegante y tranquila. Se siente feliz en un hogar donde la cuiden y le den atención.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107615/bombay_24_wj3kmt.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: false,
      fechaIngreso: '2025-04-18'
    },
    {
      id: 24,
      nombre: 'Felix',
      especie: 'Gato',
      raza: 'Siberiano',
      genero: 'Macho',
      edad: 6,
      tamano: 'Grande',
      descripcion: 'Felix es fuerte y cariñoso. Se adapta bien a climas fríos y disfruta del contacto humano.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107641/siberiano_27_yvw3wt.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2024-05-01'
    },
    {
      id: 25,
      nombre: 'Lulu',
      especie: 'Gato',
      raza: 'Americano',
      genero: 'Hembra',
      edad: 4,
      tamano: 'Pequeño',
      descripcion: 'Lulu es juguetona y le encanta perseguir pelotitas. Es muy tierna y busca atención constante.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107649/americano_28_j4goez.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2022-05-15'
    },
    {
      id: 26,
      nombre: 'Oreo',
      especie: 'Gato',
      raza: 'Siames',
      genero: 'Macho',
      edad: 3,
      tamano: 'Mediano',
      descripcion: 'Oreo es juguetón y curioso. Le encanta explorar cada rincón de la casa y pedir mimos.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107558/siames_17_xzwjyk.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2024-05-25'
    },
    {
      id: 27,
      nombre: 'Maya',
      especie: 'Gato',
      raza: 'Bombay',
      genero: 'Hembra',
      edad: 3,
      tamano: 'Mediano',
      descripcion: 'Maya es calmada y le gusta dormir en lugares cálidos. Es muy tierna y sociable.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107632/bombay_26_x5m7pf.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: false,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2024-06-01'
    },
    {
      id: 28,
      nombre: 'Salem',
      especie: 'Gato',
      raza: 'Bombay',
      genero: 'Macho',
      edad: 4,
      tamano: 'Mediano',
      descripcion: 'Salem es curioso y le encanta observar todo lo que sucede en la casa. Tiene un carácter amistoso.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107624/bombay_25_fbkz7h.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: false,
      fechaIngreso: '2023-06-15'
    },
    {
      id: 29,
      nombre: 'Momo',
      especie: 'Gato',
      raza: 'Americano',
      genero: 'Macho',
      edad: 4,
      tamano: 'Pequeño',
      descripcion: 'Momo es curioso y juguetón, siempre busca nuevas aventuras dentro de la casa.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107658/americano_29_tyhef0.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: false,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2022-07-01'
    },
    {
      id: 30,
      nombre: 'Nube',
      especie: 'Gato',
      raza: 'Americano',
      genero: 'Hembra',
      edad: 4,
      tamano: 'Grande',
      descripcion: 'Nube es muy tierna y dócil. Se adapta fácilmente y le encanta estar en brazos.',
      imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107667/americano_30_dmcgyv.jpg',
      disponibilidad: 'Disponible',
      vacunado: true,
      esterilizado: true,
      buenoConNinos: true,
      buenoConOtrasMascotas: true,
      fechaIngreso: '2023-07-15'
    }
  ];

  constructor() {}

  // Obtener todas las mascotas
  getMascotas(): Observable<Mascota[]> {
    return of(this.mascotas);
  }

  // Filtrar mascotas
  filtrarMascotas(filtros: FiltroAdopcion): Observable<Mascota[]> {
    return of(this.mascotas).pipe(
      map(mascotas => {
        return mascotas.filter(mascota => {
          if (filtros.especie && filtros.especie !== 'Todas las especies') {
            if (mascota.especie !== filtros.especie) return false;
          }
          if (filtros.tamano && filtros.tamano !== 'Todos los tamaños') {
            if (mascota.tamano !== filtros.tamano) return false;
          }
          if (filtros.genero && filtros.genero !== 'Todos los géneros') {
            if (mascota.genero !== filtros.genero) return false;
          }
          if (filtros.edadMaxima && filtros.edadMaxima < 10) {
            if (mascota.edad > filtros.edadMaxima) return false;
          }
          if (filtros.vacunado) {
            if (!mascota.vacunado) return false;
          }
          if (filtros.esterilizado) {
            if (!mascota.esterilizado) return false;
          }
          if (filtros.buenoConNinos) {
            if (!mascota.buenoConNinos) return false;
          }
          if (filtros.buenoConOtrasMascotas) {
            if (!mascota.buenoConOtrasMascotas) return false;
          }
          return true;
        });
      })
    );
  }
}
