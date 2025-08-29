export interface Cita {
  // Información del propietario
  nombreCompleto: string;
  telefono: string;
  email: string;
  
  // Información de la mascota
  nombreMascota: string;
  especie: string;
  raza: string;
  edad: string;
  
  // Detalles de la cita
  servicioRequerido: string;
  fechaPreferida: string;
  horaPreferida: string;
  notasAdicionales: string;
}
