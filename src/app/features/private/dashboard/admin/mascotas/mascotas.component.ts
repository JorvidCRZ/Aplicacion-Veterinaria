import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mascota } from '../../../../../core/models/mascota';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent implements OnInit {
  mascotas: Mascota[] = [];
  mascotasFiltradas: Mascota[] = [];
  searchTerm: string = '';
  mostrarModal: boolean = false;
  mascotaEditando: Mascota | null = null;
  imagenPreview: string | null = null;
  selectedFile: File | null = null;
  
  mascotaForm = {
    nombre: '',
    especie: '',
    raza: '',
    genero: '',
    edad: 0,
    tamano: '',
    descripcion: '',
    imagen: '',
    disponibilidad: 'Disponible',
    fechaIngreso: '',
    vacunado: false,
    esterilizado: false,
    buenoConNinos: false,
    buenoConOtrasMascotas: false
  };

  ngOnInit(): void {
    this.cargarMascotas();
  }

  cargarMascotas(): void {
    // Cargar mascotas del localStorage
    const mascotasStr = localStorage.getItem('mascotas');
    if (mascotasStr) {
      this.mascotas = JSON.parse(mascotasStr);
    } else {
      // Mascotas de ejemplo usando el modelo Mascota correcto
      this.mascotas = [
        {
          id: 1,
          nombre: 'Luna',
          especie: 'Perro',
          raza: 'Golden Retriever',
          genero: 'Hembra',
          edad: 2,
          tamano: 'Grande',
          descripcion: 'Luna es una perrita muy cariñosa y juguetona',
          imagen: 'https://res.cloudinary.com/dcdw3ofx2/image/upload/v1756107458/golden_retriever4_zmspzs.jpg',
          disponibilidad: 'Disponible',
          vacunado: true,
          esterilizado: true,
          buenoConNinos: true,
          buenoConOtrasMascotas: true,
          fechaIngreso: '15/08/2024'
        },
        {
          id: 2,
          nombre: 'Milo',
          especie: 'Gato',
          raza: 'Siamés',
          genero: 'Macho',
          edad: 1,
          tamano: 'Mediano',
          descripcion: 'Milo es un gato muy tranquilo y sociable',
          imagen: 'assets/mascotas/milo.webp',
          disponibilidad: 'Disponible',
          vacunado: true,
          esterilizado: false,
          buenoConNinos: true,
          buenoConOtrasMascotas: false,
          fechaIngreso: '20/07/2024'
        },
        {
          id: 3,
          nombre: 'Rex',
          especie: 'Perro',
          raza: 'Pastor Alemán',
          genero: 'Macho',
          edad: 5,
          tamano: 'Grande',
          descripcion: 'Rex es un perro muy leal y protector',
          imagen: 'assets/mascotas/rex.webp',
          disponibilidad: 'Adoptado',
          vacunado: true,
          esterilizado: true,
          buenoConNinos: false,
          buenoConOtrasMascotas: true,
          fechaIngreso: '10/06/2024'
        },
        {
          id: 4,
          nombre: 'Bella',
          especie: 'Gato',
          raza: 'Persa',
          genero: 'Hembra',
          edad: 3,
          tamano: 'Mediano',
          descripcion: 'Bella es una gata muy elegante y calmada',
          imagen: 'assets/mascotas/bella.webp',
          disponibilidad: 'En proceso',
          vacunado: true,
          esterilizado: true,
          buenoConNinos: true,
          buenoConOtrasMascotas: true,
          fechaIngreso: '05/08/2024'
        }
      ];
    }
    this.mascotasFiltradas = [...this.mascotas];
  }

  filtrarMascotas(): void {
    if (!this.searchTerm) {
      this.mascotasFiltradas = [...this.mascotas];
      return;
    }
    
    this.mascotasFiltradas = this.mascotas.filter(mascota =>
      mascota.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      mascota.especie.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      mascota.raza.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  abrirModalNuevo(): void {
    this.mascotaEditando = null;
    this.imagenPreview = null;
    this.selectedFile = null;
    this.mascotaForm = {
      nombre: '',
      especie: '',
      raza: '',
      genero: '',
      edad: 0,
      tamano: '',
      descripcion: '',
      imagen: '',
      disponibilidad: 'Disponible',
      fechaIngreso: new Date().toISOString().split('T')[0],
      vacunado: false,
      esterilizado: false,
      buenoConNinos: false,
      buenoConOtrasMascotas: false
    };
    this.mostrarModal = true;
  }

  editarMascota(mascota: Mascota): void {
    this.mascotaEditando = mascota;
    this.imagenPreview = mascota.imagen || null;
    this.selectedFile = null;
    this.mascotaForm = {
      nombre: mascota.nombre,
      especie: mascota.especie,
      raza: mascota.raza,
      genero: mascota.genero,
      edad: mascota.edad,
      tamano: mascota.tamano,
      descripcion: mascota.descripcion || '',
      imagen: mascota.imagen || '',
      disponibilidad: mascota.disponibilidad,
      fechaIngreso: mascota.fechaIngreso,
      vacunado: mascota.vacunado,
      esterilizado: mascota.esterilizado,
      buenoConNinos: mascota.buenoConNinos,
      buenoConOtrasMascotas: mascota.buenoConOtrasMascotas
    };
    this.mostrarModal = true;
  }

  eliminarMascota(mascota: Mascota): void {
    if (confirm(`¿Estás seguro de eliminar a ${mascota.nombre}?`)) {
      this.mascotas = this.mascotas.filter(m => m.id !== mascota.id);
      this.filtrarMascotas();
      this.guardarEnLocalStorage();
    }
  }

  guardarMascota(): void {
    if (this.mascotaEditando) {
      // Actualizar mascota existente
      const index = this.mascotas.findIndex(m => m.id === this.mascotaEditando!.id);
      if (index !== -1) {
        this.mascotas[index] = {
          id: this.mascotas[index].id,
          nombre: this.mascotaForm.nombre,
          especie: this.mascotaForm.especie,
          raza: this.mascotaForm.raza,
          genero: this.mascotaForm.genero,
          edad: this.mascotaForm.edad,
          tamano: this.mascotaForm.tamano,
          descripcion: this.mascotaForm.descripcion,
          imagen: this.mascotaForm.imagen,
          disponibilidad: this.mascotaForm.disponibilidad,
          vacunado: this.mascotaForm.vacunado,
          esterilizado: this.mascotaForm.esterilizado,
          buenoConNinos: this.mascotaForm.buenoConNinos,
          buenoConOtrasMascotas: this.mascotaForm.buenoConOtrasMascotas,
          fechaIngreso: this.mascotas[index].fechaIngreso
        };
      }
    } else {
      // Crear nueva mascota
      const nuevaMascota: Mascota = {
        id: this.mascotas.length > 0 ? Math.max(...this.mascotas.map(m => m.id)) + 1 : 1,
        nombre: this.mascotaForm.nombre,
        especie: this.mascotaForm.especie,
        raza: this.mascotaForm.raza,
        genero: this.mascotaForm.genero,
        edad: this.mascotaForm.edad,
        tamano: this.mascotaForm.tamano,
        descripcion: this.mascotaForm.descripcion,
        imagen: this.mascotaForm.imagen,
        disponibilidad: this.mascotaForm.disponibilidad,
        vacunado: this.mascotaForm.vacunado,
        esterilizado: this.mascotaForm.esterilizado,
        buenoConNinos: this.mascotaForm.buenoConNinos,
        buenoConOtrasMascotas: this.mascotaForm.buenoConOtrasMascotas,
        fechaIngreso: this.formatearFecha(new Date())
      };
      this.mascotas.push(nuevaMascota);
    }
    
    this.filtrarMascotas();
    this.guardarEnLocalStorage();
    this.cerrarModal();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.mascotaEditando = null;
    this.imagenPreview = null;
    this.selectedFile = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      reader.readAsDataURL(file);
      
      // Simular guardar como base64 o URL (en un caso real se subiría al servidor)
      this.mascotaForm.imagen = this.convertFileToImagePath(file);
    }
  }

  removeImage(): void {
    this.imagenPreview = null;
    this.selectedFile = null;
    this.mascotaForm.imagen = '';
  }

  private convertFileToImagePath(file: File): string {
    // En un caso real, aquí subirías el archivo al servidor y devolverías la URL
    // Por ahora, simularemos con un path local
    return `assets/mascotas/${file.name}`;
  }

  formatearFecha(fecha: Date | string): string {
    if (!fecha) return '';
    const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  getBadgeClass(disponibilidad: string): string {
    switch (disponibilidad) {
      case 'Disponible':
        return 'estado-disponible';
      case 'Adoptado':
        return 'estado-adoptado';
      case 'En proceso':
        return 'estado-en-proceso';
      default:
        return 'estado-no-disponible';
    }
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem('mascotas', JSON.stringify(this.mascotas));
  }
}
