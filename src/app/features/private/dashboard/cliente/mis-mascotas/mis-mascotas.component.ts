import { Component, OnInit } from '@angular/core';
import { MiMascota, MiMascotaCardComponent } from '../../../../../shared/components/index-dashboard-user';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';

interface MascotaUsuario {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  genero: string;
  edad: number;
  tamano: string;
  foto: string;
  fechaRegistro: string;
  proximaCita: string;
}

interface NuevaMascota {
  nombre: string;
  especie: string;
  raza: string;
  genero: string;
  edad: number;
  tamano: string;
  foto: string;
}

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [CommonModule, RouterModule, MiMascotaCardComponent, FormsModule],
  templateUrl: './mis-mascotas.component.html',
  styleUrl: './mis-mascotas.component.css'
})
export class MisMascotasComponent implements OnInit{
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  mascotas: MascotaUsuario[] = [
    {
      id: '1',
      nombre: 'Luna',
      especie: 'Perro',
      raza: 'Golden Retriever',
      genero: 'Hembra',
      edad: 3,
      tamano: 'Grande',
      foto: 'assets/dueños/ama-perro.webp',
      fechaRegistro: '2024-01-15',
      proximaCita: '2025-09-05',
    },
    {
      id: '2',
      nombre: 'Mimi',
      especie: 'Gato',
      raza: 'Persa',
      genero: 'Hembra',
      edad: 2,
      tamano: 'Mediano',
      foto: 'assets/dueños/amo-gato.webp',
      fechaRegistro: '2024-06-20',
      proximaCita: '2025-09-10',
    }
  ];

  // Variables del formulario
  mostrarModal: boolean = false;
  modoEdicion: boolean = false;
  mascotaEditando: MascotaUsuario | null = null;
  nuevaMascota: NuevaMascota = {
    nombre: '',
    especie: '',
    raza: '',
    genero: '',
    edad: 0,
    tamano: '',
    foto: ''
  };
  
  // Opciones para selects
  especies = ['Perro', 'Gato'];
  generos = ['Macho', 'Hembra'];
  tamanos = ['Pequeño', 'Mediano', 'Grande'];
  
  // Variables para upload de imagen
  imagenPreview: string = '';
  archivoSeleccionado: File | null = null;
  uploadError: string = '';
  uploadSuccess: boolean = false;
  maxFileSize: number = 5 * 1024 * 1024; // 5MB
  tiposPermitidos: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  ngOnInit(): void {
    // Aquí podrías cargar las mascotas del usuario desde un servicio
  }

  agendarCita(mascota: MascotaUsuario | MiMascota): void {
    // Obtener el usuario actual del servicio de autenticación
    const usuarioActual = this.authService.getCurrentUser();
    
    // Preparar datos para el formulario de servicio
    const datosPrellenos = {
      // Información del propietario desde el usuario logueado
      nombreCompleto: usuarioActual?.nombre || 'Usuario',
      telefono: usuarioActual?.telefono || '',
      email: usuarioActual?.email || '',
      
      // Información de la mascota
      nombreMascota: mascota.nombre,
      especie: 'especie' in mascota ? mascota.especie : 'Perro', // Default para MiMascota
      raza: mascota.raza,
      edad: mascota.edad.toString()
    };
    
    // Guardar temporalmente los datos en localStorage
    localStorage.setItem('datosPrellenos', JSON.stringify(datosPrellenos));
    
    // Navegar al formulario de servicio
    this.router.navigate(['/servicio-formulario']);
  }

  editarMascota(mascota: MiMascota): void {
    // Encontrar la mascota completa en el array
    const mascotaCompleta = this.mascotas.find(m => m.id === mascota.id);
    if (mascotaCompleta) {
      this.modoEdicion = true;
      this.mascotaEditando = mascotaCompleta;
      
      // Cargar datos en el formulario
      this.nuevaMascota = {
        nombre: mascotaCompleta.nombre,
        especie: mascotaCompleta.especie,
        raza: mascotaCompleta.raza,
        genero: mascotaCompleta.genero,
        edad: mascotaCompleta.edad,
        tamano: mascotaCompleta.tamano,
        foto: mascotaCompleta.foto
      };
      
      // Si tiene foto, mostrar preview (tanto imágenes de assets como base64)
      if (mascotaCompleta.foto) {
        this.imagenPreview = mascotaCompleta.foto;
      } else {
        this.imagenPreview = '';
      }
      
      this.uploadError = '';
      this.uploadSuccess = false;
      this.mostrarModal = true;
    }
  }

  transformMascota(mascota: MascotaUsuario): MiMascota {
    return {
      id: mascota.id,
      nombre: mascota.nombre,
      raza: mascota.raza,
      edad: mascota.edad,
      foto: mascota.foto,
      fechaRegistro: new Date(mascota.fechaRegistro),
      proximaCita: mascota.proximaCita ? new Date(mascota.proximaCita) : undefined
    };
  }

  // Métodos del formulario
  abrirModal(): void {
    this.modoEdicion = false;
    this.mascotaEditando = null;
    this.mostrarModal = true;
    this.resetearFormulario();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.modoEdicion = false;
    this.mascotaEditando = null;
    this.resetearFormulario();
  }

  resetearFormulario(): void {
    this.nuevaMascota = {
      nombre: '',
      especie: '',
      raza: '',
      genero: '',
      edad: 0,
      tamano: '',
      foto: ''
    };
    this.imagenPreview = '';
    this.archivoSeleccionado = null;
    this.uploadError = '';
    this.uploadSuccess = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.uploadError = '';
    this.uploadSuccess = false;
    
    if (!file) {
      this.limpiarImagen();
      return;
    }

    // Validar tipo de archivo
    if (!this.tiposPermitidos.includes(file.type)) {
      this.uploadError = 'Solo se permiten archivos JPG, PNG y WEBP';
      this.limpiarImagen();
      return;
    }

    // Validar tamaño de archivo
    if (file.size > this.maxFileSize) {
      this.uploadError = 'El archivo no puede ser mayor a 5MB';
      this.limpiarImagen();
      return;
    }

    // Procesar imagen
    this.archivoSeleccionado = file;
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      this.imagenPreview = e.target.result;
      this.nuevaMascota.foto = e.target.result;
      this.uploadSuccess = true;
      this.uploadError = '';
    };
    
    reader.onerror = () => {
      this.uploadError = 'Error al cargar la imagen';
      this.limpiarImagen();
    };
    
    reader.readAsDataURL(file);
  }

  limpiarImagen(): void {
    this.imagenPreview = '';
    this.nuevaMascota.foto = '';
    this.archivoSeleccionado = null;
    this.uploadSuccess = false;
    // Limpiar el input file
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  eliminarImagen(): void {
    this.limpiarImagen();
    this.uploadError = '';
  }

  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  guardarMascota(): void {
    if (this.validarFormulario()) {
      // Determinar la foto a usar
      let fotoFinal = this.nuevaMascota.foto;
      
      if (this.archivoSeleccionado) {
        // Si hay un archivo nuevo seleccionado, usar la preview
        fotoFinal = this.imagenPreview;
      } else if (!fotoFinal || fotoFinal.includes('assets/')) {
        // Si no hay foto o es una imagen por defecto, asignar una nueva por defecto
        switch (this.nuevaMascota.especie.toLowerCase()) {
          case 'perro':
            fotoFinal = 'assets/dueños/ama-perro.webp';
            break;
          case 'gato':
            fotoFinal = 'assets/dueños/amo-gato.webp';
            break;
          default:
            fotoFinal = 'assets/general/mascota-default.webp';
        }
      }

      if (this.modoEdicion && this.mascotaEditando) {
        // Actualizar mascota existente
        const index = this.mascotas.findIndex(m => m.id === this.mascotaEditando!.id);
        if (index !== -1) {
          this.mascotas[index] = {
            ...this.mascotaEditando,
            nombre: this.nuevaMascota.nombre.trim(),
            especie: this.nuevaMascota.especie,
            raza: this.nuevaMascota.raza.trim(),
            genero: this.nuevaMascota.genero,
            edad: this.nuevaMascota.edad,
            tamano: this.nuevaMascota.tamano,
            foto: fotoFinal
          };
          console.log('Mascota actualizada:', this.mascotas[index]);
        }
      } else {
        // Crear nueva mascota
        const nuevaMascotaData: MascotaUsuario = {
          id: Date.now().toString(),
          nombre: this.nuevaMascota.nombre.trim(),
          especie: this.nuevaMascota.especie,
          raza: this.nuevaMascota.raza.trim(),
          genero: this.nuevaMascota.genero,
          edad: this.nuevaMascota.edad,
          tamano: this.nuevaMascota.tamano,
          foto: fotoFinal,
          fechaRegistro: new Date().toISOString().split('T')[0],
          proximaCita: '',
        };
        
        this.mascotas.push(nuevaMascotaData);
        console.log('Nueva mascota agregada:', nuevaMascotaData);
      }
      
      this.cerrarModal();
    }
  }

  validarFormulario(): boolean {
    return this.nuevaMascota.nombre.trim() !== '' &&
           this.nuevaMascota.especie !== '' &&
           this.nuevaMascota.raza.trim() !== '' &&
           this.nuevaMascota.genero !== '' &&
           this.nuevaMascota.edad > 0 &&
           this.nuevaMascota.tamano !== '';
  }
}
