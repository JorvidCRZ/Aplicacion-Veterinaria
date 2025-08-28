import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../core/models/product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();

  constructor(private router: Router) { }

  viewProduct(): void {
    this.router.navigate(['/detalle-producto', this.product.id]);
  }

  addToCart() {
    this.add.emit(this.product);
    this.router.navigate(['/detalle-producto', this.product.id]);
  }
}