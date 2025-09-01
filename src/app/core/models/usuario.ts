export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  password: string;
  rol?: 'usuario' | 'admin';
}