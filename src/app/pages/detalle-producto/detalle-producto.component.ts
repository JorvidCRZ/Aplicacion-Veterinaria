import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../core/services/carrito.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit {

  product: Product | undefined;
  quantity = 1;
  loading = true;
  error = false;
  mensaje: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product = product;
          this.loading = false;
          this.error = !product;
        },
        error: () => {
          this.loading = false;
          this.error = true;
        }
      });
    } else {
      this.loading = false;
      this.error = true;
    }
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.carritoService.agregarProducto({
        idproducto: this.product.id,
        nombre: this.product.name,
        precio: this.product.price,
        cantidad: this.quantity
      });

      this.mensaje = `${this.product.name} fue agregado al carrito`;

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        this.mensaje = null;
      }, 500);
    }
  }

  goBack(): void {
    this.router.navigate(['/productos']);
  }


}
