import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../../../core/models/product';
import { FilterValues } from '../../../core/models/filterValues';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<FilterValues>();

  categories: Category[] = [];
  
  filters: FilterValues = {
    category: 'Todas las categorías',
    minPrice: 0,
    maxPrice: 400,
    inStock: false
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

  }

  onFilterChange(): void {
    this.filtersChanged.emit(this.filters);
  }

  clearFilters(): void {
    this.filters = {
      category: 'Todas las categorías',
      minPrice: 0,
      maxPrice: 400,
      inStock: false
    };
    this.onFilterChange();
  }
}
