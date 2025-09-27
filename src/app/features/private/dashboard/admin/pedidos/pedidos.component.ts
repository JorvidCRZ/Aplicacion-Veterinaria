import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


export interface MiPedido {
  id: string;
  fechaPedido: Date;
  estado: string;
  subtotal: number;
  precioEnvio: number;
  total: number;
  productos: Array<{
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }>;
  // Datos del cliente
  cliente: {
    nombre: string;
    correo: string;
    telefono: string;
  };
  // Datos de entrega
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  telefonoContacto: string;
  metodoPago: string;
  fechaEntrega?: Date;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  pedidos: MiPedido[] = [];
  pedidosFiltrados: MiPedido[] = [];
  searchTerm: string = '';
  filtroEstado: string = '';
  mostrarModal: boolean = false;
  pedidoEditando: MiPedido | null = null;
  pedidoDetalle: MiPedido | null = null;
  mostrarDetalle: boolean = false;
  
  // Estadísticas
  stats = {
    totalPedidos: 0,
    pendiente: 0,
    enviados: 0,
    entregados: 0,
    procesados: 0,
    cancelados: 0,
    valorTotal: 0
  };

  // Estados disponibles
  estados = [
    'Pendiente',
    'Procesando', 
    'Enviado',
    'Entregado',
    'Cancelado'
  ];

  ngOnInit(): void {
    this.cargarPedidos();
    this.calcularEstadisticas();
  }

  cargarPedidos(): void {
    // Cargar pedidos del localStorage
    const pedidosStr = localStorage.getItem('pedidos');
    if (pedidosStr) {
      this.pedidos = JSON.parse(pedidosStr);
      // Convertir fechas de string a Date si es necesario
      this.pedidos.forEach(pedido => {
        if (typeof pedido.fechaPedido === 'string') {
          pedido.fechaPedido = new Date(pedido.fechaPedido);
        }
        if (pedido.fechaEntrega && typeof pedido.fechaEntrega === 'string') {
          pedido.fechaEntrega = new Date(pedido.fechaEntrega);
        }
      });
    } else {
      // Pedidos de ejemplo basados en la imagen
      this.pedidos = [
        {
          id: 'ORD-001',
          fechaPedido: new Date('2024-01-05'),
          estado: 'Pendiente',
          subtotal: 84.99,
          precioEnvio: 5.00,
          total: 89.99,
          productos: [
            { nombre: 'Alimento Premium Perro X2', cantidad: 2, precioUnitario: 34.99, subtotal: 69.98 },
            { nombre: 'Juguete Interactivo XL', cantidad: 1, precioUnitario: 15.01, subtotal: 15.01 }
          ],
          cliente: {
            nombre: 'María González',
            correo: 'maria.gonzalez@email.com',
            telefono: '+51 987 654 321'
          },
          direccion: 'Av. Los Olivos 123, Dpto 401',
          ciudad: 'Lima',
          codigoPostal: '15036',
          telefonoContacto: '+51 987 654 321',
          metodoPago: 'Tarjeta de Crédito',
          fechaEntrega: new Date('2024-01-07')
        },
        {
          id: 'ORD-002',
          fechaPedido: new Date('2024-01-04'),
          estado: 'Enviado',
          subtotal: 148.00,
          precioEnvio: 8.50,
          total: 156.50,
          productos: [
            { nombre: 'Collar Antipulgas', cantidad: 3, precioUnitario: 15.99, subtotal: 47.97 },
            { nombre: 'Vitaminas para Gatos', cantidad: 2, precioUnitario: 50.01, subtotal: 100.02 }
          ],
          cliente: {
            nombre: 'Carlos Mendoza',
            correo: 'carlos.mendoza@email.com',
            telefono: '+51 912 345 678'
          },
          direccion: 'Jr. Las Flores 456',
          ciudad: 'Callao',
          codigoPostal: '07001',
          telefonoContacto: '+51 912 345 678',
          metodoPago: 'Yape',
          fechaEntrega: new Date('2024-01-06')
        },
        {
          id: 'ORD-003',
          fechaPedido: new Date('2024-01-03'),
          estado: 'Entregado',
          subtotal: 224.80,
          precioEnvio: 10.00,
          total: 234.80,
          productos: [
            { nombre: 'Cama Premium para Perros', cantidad: 1, precioUnitario: 89.99, subtotal: 89.99 },
            { nombre: 'Transportadora Mediana', cantidad: 1, precioUnitario: 134.81, subtotal: 134.81 }
          ],
          cliente: {
            nombre: 'Ana Rodríguez',
            correo: 'ana.rodriguez@email.com',
            telefono: '+51 965 432 109'
          },
          direccion: 'Calle San Martín 789',
          ciudad: 'Arequipa',
          codigoPostal: '04001',
          telefonoContacto: '+51 965 432 109',
          metodoPago: 'Transferencia Bancaria',
          fechaEntrega: new Date('2024-01-05')
        },
        {
          id: 'ORD-004',
          fechaPedido: new Date('2024-01-02'),
          estado: 'Procesando',
          subtotal: 62.25,
          precioEnvio: 5.00,
          total: 67.25,
          productos: [
            { nombre: 'Snacks Naturales', cantidad: 3, precioUnitario: 12.50, subtotal: 37.50 },
            { nombre: 'Galletas para Perros', cantidad: 2, precioUnitario: 12.37, subtotal: 24.74 }
          ],
          cliente: {
            nombre: 'Luis Vargas',
            correo: 'luis.vargas@email.com',
            telefono: '+51 998 765 432'
          },
          direccion: 'Av. Universitaria 1020',
          ciudad: 'San Martín de Porres',
          codigoPostal: '15109',
          telefonoContacto: '+51 998 765 432',
          metodoPago: 'Tarjeta de Débito',
          fechaEntrega: new Date('2024-01-04')
        }
      ];
      
    }
    this.pedidosFiltrados = [...this.pedidos];
  }

  calcularEstadisticas(): void {
    this.stats.totalPedidos = this.pedidos.length;
    this.stats.pendiente = this.pedidos.filter(p => p.estado === 'Pendiente').length;
    this.stats.enviados = this.pedidos.filter(p => p.estado === 'Enviado').length;
    this.stats.entregados = this.pedidos.filter(p => p.estado === 'Entregado').length;
    this.stats.procesados = this.pedidos.filter(p => p.estado === 'Procesando').length;
    this.stats.cancelados = this.pedidos.filter(p => p.estado === 'Cancelado').length;
    this.stats.valorTotal = this.pedidos.reduce((total, p) => total + p.total, 0);
  }

  filtrarPedidos(): void {
    let pedidosFiltrados = this.pedidos;
    
    // Filtrar por término de búsqueda
    if (this.searchTerm) {
      pedidosFiltrados = pedidosFiltrados.filter(pedido =>
        pedido.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pedido.cliente.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pedido.cliente.correo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pedido.productos.some((p: any) => p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
    
    // Filtrar por estado
    if (this.filtroEstado) {
      pedidosFiltrados = pedidosFiltrados.filter(pedido =>
        pedido.estado === this.filtroEstado
      );
    }
    
    this.pedidosFiltrados = pedidosFiltrados;
  }

  limpiarFiltros(): void {
    this.searchTerm = '';
    this.filtroEstado = '';
    this.pedidosFiltrados = [...this.pedidos];
  }

  verDetalle(pedido: MiPedido): void {
    this.pedidoDetalle = pedido;
    this.mostrarDetalle = true;
  }

  cerrarDetalle(): void {
    this.mostrarDetalle = false;
    this.pedidoDetalle = null;
  }

  cambiarEstado(pedido: MiPedido, nuevoEstado: string): void {
    const index = this.pedidos.findIndex(p => p.id === pedido.id);
    if (index !== -1) {
      this.pedidos[index].estado = nuevoEstado;
      this.guardarEnLocalStorage();
      this.filtrarPedidos();
      this.calcularEstadisticas();
    }
  }

  eliminarPedido(pedido: MiPedido): void {
    if (confirm(`¿Estás seguro de eliminar el pedido ${pedido.id}?`)) {
      this.pedidos = this.pedidos.filter(p => p.id !== pedido.id);
      this.filtrarPedidos();
      this.calcularEstadisticas();
      this.guardarEnLocalStorage();
    }
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.pedidoEditando = null;
  }

  formatearFecha(fecha: Date): string {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString('es-ES');
  }

  getEstadoBadgeClass(estado: string): string {
    switch (estado) {
      case 'Pendiente':
        return 'badge-pendiente';
      case 'Procesando':
        return 'badge-procesando';
      case 'Enviado':
        return 'badge-enviado';
      case 'Entregado':
        return 'badge-entregado';
      case 'Cancelado':
        return 'badge-cancelado';
      default:
        return 'badge-pendiente';
    }
  }

  formatPrice(price: number): string {
    return `S/${price.toFixed(2)}`;
  }


  generarNuevoId(): string {
    return 'ORD-' + Date.now().toString().slice(-6);
  }

  exportarPedidos(): void {
    // Funcionalidad de exportación
    const dataStr = JSON.stringify(this.pedidosFiltrados, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pedidos.json';
    link.click();
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
  }
}
