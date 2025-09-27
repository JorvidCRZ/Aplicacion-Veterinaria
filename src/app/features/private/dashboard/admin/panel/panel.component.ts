import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { Usuario } from '../../../../../core/models/usuario';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReporteData {
  usuarios: number;
  mascotasAdopcion: number;
  adopciones: number;
  productos: number;
  pedidos: number;
  citas: number;
}

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  currentUser: Usuario | null = null;
  Math = Math; // Para usar Math en el template
  
  stats = {
    usuariosRegistrados: 1234,
    mascotasAdopcion: 45,
    pedidosPendientes: 23,
    citasHoy: 12,
    productosStock: 156,
    valorInventario: '3936.30'
  };

  // Variables para reportes
  fechaInicio: string = '';
  fechaFin: string = '';
  reporteGenerado: boolean = false;
  cargandoReporte: boolean = false;
  
  reporteData: ReporteData = {
    usuarios: 0,
    mascotasAdopcion: 0,
    adopciones: 0,
    productos: 0,
    pedidos: 0,
    citas: 0
  };

  constructor(private authService: AuthService) {
    // Establecer fechas por defecto (último mes)
    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    this.fechaFin = hoy.toISOString().split('T')[0];
    this.fechaInicio = inicioMes.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  generarReporte(): void {
    if (!this.fechaInicio || !this.fechaFin) {
      alert('Por favor selecciona ambas fechas');
      return;
    }

    if (new Date(this.fechaInicio) > new Date(this.fechaFin)) {
      alert('La fecha de inicio no puede ser mayor a la fecha de fin');
      return;
    }

    this.cargandoReporte = true;
    
    // Simular llamada a API
    setTimeout(() => {
      this.reporteData = {
        usuarios: Math.floor(Math.random() * 200) + 50,
        mascotasAdopcion: Math.floor(Math.random() * 30) + 10,
        adopciones: Math.floor(Math.random() * 25) + 5,
        productos: Math.floor(Math.random() * 50) + 20,
        pedidos: Math.floor(Math.random() * 80) + 30,
        citas: Math.floor(Math.random() * 100) + 40
      };
      
      this.reporteGenerado = true;
      this.cargandoReporte = false;
    }, 1500);
  }

  limpiarReporte(): void {
    this.reporteGenerado = false;
    this.reporteData = {
      usuarios: 0,
      mascotasAdopcion: 0,
      adopciones: 0,
      productos: 0,
      pedidos: 0,
      citas: 0
    };
  }

  exportarPDF(): void {
    if (!this.reporteGenerado) {
      alert('Primero debes generar un reporte');
      return;
    }

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      
      // ==== ENCABEZADO PROFESIONAL ====
      // Fondo del encabezado
      doc.setFillColor(26, 78, 141); // Azul oscuro profesional
      doc.rect(0, 0, pageWidth, 60, 'F');
      
      // Título principal
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('VETERINARIA PETSECRETZ', pageWidth / 2, 25, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('Sistema de Gestion Veterinaria', pageWidth / 2, 42, { align: 'center' });
      
      // ==== INFORMACIÓN DEL REPORTE ====
      doc.setTextColor(34, 49, 63);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('REPORTE ADMINISTRATIVO', pageWidth / 2, 75, { align: 'center' });
      
      // Línea separadora
      doc.setDrawColor(34, 49, 63);
      doc.setLineWidth(1);
      doc.line(margin, 82, pageWidth - margin, 82);
      
      // Información del período
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const periodoText = `Periodo: ${this.formatearFecha(this.fechaInicio)} - ${this.formatearFecha(this.fechaFin)}`;
      doc.text(periodoText, pageWidth / 2, 95, { align: 'center' });
      
      // ==== MÉTRICAS PRINCIPALES ====
      let yPosition = 110;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(34, 49, 63);
      doc.text('METRICAS DEL PERIODO', margin, yPosition);
      
      // Crear tabla simple de métricas
      yPosition += 20;
      const metricas = [
        { label: 'Usuarios Registrados', valor: this.reporteData.usuarios },
        { label: 'Mascotas en Adopcion', valor: this.reporteData.mascotasAdopcion },
        { label: 'Adopciones Realizadas', valor: this.reporteData.adopciones },
        { label: 'Productos Gestionados', valor: this.reporteData.productos },
        { label: 'Pedidos Procesados', valor: this.reporteData.pedidos },
        { label: 'Citas Medicas', valor: this.reporteData.citas }
      ];
      
      // Encabezados de tabla
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, yPosition, pageWidth - (margin * 2), 15, 'F');
      doc.setTextColor(34, 49, 63);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('CONCEPTO', margin + 5, yPosition + 10);
      doc.text('CANTIDAD', pageWidth - margin - 30, yPosition + 10);
      
      yPosition += 15;
      
      // Filas de datos
      metricas.forEach((metrica, index) => {
        const isEven = index % 2 === 0;
        if (isEven) {
          doc.setFillColor(250, 250, 250);
          doc.rect(margin, yPosition, pageWidth - (margin * 2), 12, 'F');
        }
        
        doc.setTextColor(60, 60, 60);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(metrica.label, margin + 5, yPosition + 8);
        doc.setFont('helvetica', 'bold');
        doc.text(metrica.valor.toString(), pageWidth - margin - 30, yPosition + 8);
        
        yPosition += 12;
      });
      
      // ==== FOOTER PROFESIONAL ====
      // Asegurar que el footer esté al final con suficiente espacio
      let footerY = Math.max(yPosition + 40, pageHeight - 45);
      
      // Línea separadora
      doc.setDrawColor(150, 150, 150);
      doc.setLineWidth(0.5);
      doc.line(margin, footerY - 15, pageWidth - margin, footerY - 15);
      
      // Información del footer - lado izquierdo
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generado: ${new Date().toLocaleString('es-ES')}`, margin, footerY);
      doc.text(`Por: ${this.currentUser?.nombre || 'Administrador'}`, margin, footerY + 10);
      doc.text('Sistema de Gestion Veterinaria PetSecretz', margin, footerY + 20);
      
      // Información de contacto - lado derecho
      doc.text('info@petsecretz.com', pageWidth - margin, footerY, { align: 'right' });
      doc.text('+51 999 888 777', pageWidth - margin, footerY + 10, { align: 'right' });
      doc.text('www.petsecretz.com', pageWidth - margin, footerY + 20, { align: 'right' });
      
      // Guardar
      const nombreArchivo = `Reporte_Completo_${this.fechaInicio}_${this.fechaFin}.pdf`;
      doc.save(nombreArchivo);
      
      alert('¡PDF profesional exportado exitosamente! 🎉');
      
    } catch (error) {
      console.error('Error al exportar PDF:', error);
      alert('Error al exportar el PDF. Revisa la consola para más detalles.');
    }
  }

  formatearFecha(fecha: string): string {
    // Crear fecha local para evitar problemas de zona horaria
    const partes = fecha.split('-');
    const fechaLocal = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
    
    return fechaLocal.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  calcularDiasEntreFechas(): number {
    // Crear fechas locales para evitar problemas de zona horaria
    const partesInicio = this.fechaInicio.split('-');
    const partesFin = this.fechaFin.split('-');
    
    const inicio = new Date(parseInt(partesInicio[0]), parseInt(partesInicio[1]) - 1, parseInt(partesInicio[2]));
    const fin = new Date(parseInt(partesFin[0]), parseInt(partesFin[1]) - 1, parseInt(partesFin[2]));
    
    const diferencia = fin.getTime() - inicio.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24)) + 1; // +1 para incluir ambos días
  }

  getNivelActividad(total: number): string {
    if (total >= 500) return 'MUY ALTO';
    if (total >= 300) return 'ALTO';
    if (total >= 150) return 'MEDIO';
    if (total >= 50) return 'BAJO';
    return 'MUY BAJO';
  }
}
