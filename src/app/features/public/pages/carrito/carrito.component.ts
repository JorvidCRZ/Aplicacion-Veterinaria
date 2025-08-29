import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarritoService, ProductoCarrito } from '../../../../core/services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carrito: ProductoCarrito[] = [];
  productos: ProductoCarrito[] = [];
  logueado: boolean = false;

  constructor(private carritoService: CarritoService, private router: Router) { }

  ngOnInit(): void {
    this.carrito = this.carritoService.getCarrito();
    // Aquí podrías verificar si está logueado desde un AuthService
    // this.logueado = this.authService.estaLogueado();
  }

  get total(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  actualizarCantidad(): void {
    this.carritoService.guardarCarrito(this.carrito);
    this.carritoService.guardarCarrito(this.carrito);
  }

  eliminarItem(index: number): void {
    this.carrito.splice(index, 1);
    this.carritoService.guardarCarrito(this.carrito);
  }

  vaciarCarrito(): void {
    this.carrito = [];
    this.carritoService.vaciarCarrito();
  }



  pagar() {
    if (this.logueado) {
      // Aquí tu lógica de pago
      alert('Redirigiendo al proceso de pago...');
    } else {
      // Si no está logueado, lo mando al login
      this.router.navigate(['/login']);
    }
  }
}
