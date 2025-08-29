import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product';
import { FilterValues } from '../../../../core/models/filterValues';
import { ProductService } from '../../../../core/services/product.service';
import { FiltroComponent } from '../../../../shared/components/filtro/filtro.component';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FiltroComponent,ProductCardComponent,CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.loading = false;
    });
  }

  onFiltersChanged(filters: FilterValues): void {
    this.loading = true;
    this.productService.filterProducts(
      filters.category,
      filters.minPrice,
      filters.maxPrice,
      filters.inStock
    ).subscribe(products => {
      this.filteredProducts = products;
      this.loading = false;
    });
  }
}
