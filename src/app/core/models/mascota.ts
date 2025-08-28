export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  genero: string;
  edad: number;
  tamano: string;
  descripcion: string;
  imagen: string;
  disponibilidad: string;
  vacunado: boolean;
  esterilizado: boolean;
  buenoConNinos: boolean;
  buenoConOtrasMascotas: boolean;
  fechaIngreso: string;
}
