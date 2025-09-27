import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarritoService, ProductoCarrito } from '../../../../core/services/carrito.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: ProductoCarrito[] = [];
  productos: ProductoCarrito[] = [];
  logueado: boolean = false;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.getCarrito();
    this.logueado = this.authService.isLoggedIn();
  }

  // Subtotal de todos los productos
  get subtotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }


  // Total 
  get total(): number {
    return this.subtotal;
  }

  // Guardar cambios en cantidades
  actualizarCantidad(): void {
    this.carritoService.guardarCarrito(this.carrito);
  }

  // Eliminar un producto por índice
  eliminarItem(index: number): void {
    this.carrito.splice(index, 1);
    this.carritoService.guardarCarrito(this.carrito);
  }

  // Vaciar todo el carrito
  vaciarCarrito(): void {
    this.carrito = [];
    this.carritoService.vaciarCarrito();
  }

  // Validar si se puede pagar
  puedePagar(): boolean {
    if (!this.carrito.length) return false;
    return this.carrito.every(item => item.cantidad > 0);
  }

  // Acción de pagar
  pagar(): void {
    if (this.authService.requireAuth('/checkout')) {
      this.router.navigate(['/checkout']);
    }
    // Si no está autenticado, requireAuth lo redirige al login
  }
  disminuirCantidad(item: ProductoCarrito): void {
  if (item.cantidad > 1) {
    item.cantidad--;
    this.actualizarCantidad();
  }
}

aumentarCantidad(item: ProductoCarrito): void {
  item.cantidad++;
  this.actualizarCantidad();
}
irAProductos(): void {
  this.router.navigate(['/productos']);
}

}
