import { Injectable } from '@angular/core';
import { Category, Product } from '../models/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Alimento Premium Ultamino',
      price: 45.99,
      category: 'Alimentos',
      description: 'Alimento balanceado de alta calidad para perros adultos',
      image: 'assets/productos/producto1.webp',
      stock: 50,
      inStock: true
    },
    {
      id: 2,
      name: 'Collar Petsfun!',
      price: 15.99,
      category: 'Accesorios',
      description: 'Collar para perro Petsfun! poliéster Talla M',
      image: 'assets/productos/producto2.webp',
      stock: 30,
      inStock: true
    },
    {
      id: 3,
      name: 'Vitaminas para gatos',
      price: 25.00,
      category: 'Medicamentos',
      description: 'Suplemento vitamínico para gatos de todas las edades',
      image: 'assets/productos/producto3.webp',
      stock: 25,
      inStock: true
    },
    {
      id: 4,
      name: 'Pelota de colores para perros',
      price: 38.00,
      category: 'Juguetes',
      description: 'Juguete interactivo para perros de todas las edades',
      image: 'assets/productos/producto4.webp',
      stock: 40,
      inStock: true
    },
    {
      id: 5,
      name: 'BRAVECTO antipulgas para perros',
      price: 95.00,
      category: 'Medicamentos',
      description: 'Antipulgas para perros de 4 a 12 kg',
      image: 'assets/productos/producto5.webp',
      stock: 34,
      inStock: true
    },
    {
      id: 6,
      name: 'Juguete raton para gatos',
      price: 35.00,
      category: 'Juguetes',
      description: 'Juguete interactivo para gatos de todas las edades',
      image: 'assets/productos/producto6.webp',
      stock: 25,
      inStock: true
    },
    {
      id: 7,
      name: 'MIMASKOT comida para perros',
      price: 120.00,
      category: 'Alimentos',
      description: 'Alimento balanceado para perros adultos de todas las razas 15kg',
      image: 'assets/productos/producto7.webp',
      stock: 70,
      inStock: true
    },
    {
      id: 8,
      name: 'FRIKIES comida para gatos',
      price: 99.00,
      category: 'Alimentos',
      description: 'Alimento balanceado para gatos adultos de todas las razas 12kg',
      image: 'assets/productos/producto8.webp',
      stock: 25,
      inStock: true
    },
    {
      id: 9,
      name: 'BRAVECTO antipulgas para gatos',
      price: 105.99,
      category: 'Medicamentos',
      description: 'Antipulgas para gatos de 2 a 8 kg',
      image: 'assets/productos/producto9.webp',
      stock: 45,
      inStock: true
    },
  ];

  private categories: Category[] = [
    { id: '1', name: 'Todas las categorías' },
    { id: '2', name: 'Alimentos' },
    { id: '3', name: 'Accesorios' },
    { id: '4', name: 'Medicamentos' },
    { id: '5', name: 'Juguetes' }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  filterProducts(
    category?: string, 
    minPrice?: number, 
    maxPrice?: number,
    inStock?: boolean
  ): Observable<Product[]> {
    let filtered = [...this.products];

    if (category && category !== 'Todas las categorías') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= maxPrice);
    }

    if (inStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    return of(filtered);
  }
}
