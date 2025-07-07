import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  editingProductId: string | null = null;
  editingProduct: any = {};

  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  addProduct() {
    this.route.navigate(['add-product']);
  }

  loadProducts() {
    this.http.get<any[]>('http://localhost:3002/api/products/getProducts').subscribe(
      data => this.products = data,
      error => console.error('Error fetching products:', error)
    );
  }

  startEditing(product: any) {
    this.editingProductId = product._id;           // mark which product is being edited
    this.editingProduct = product;          // clone product data for editing
  }

  cancelEditing() {
    this.editingProductId = null;
    this.editingProduct = {};
  }

  saveUpdatedProduct() {
    if (!this.editingProductId) return;

    const updatedData = {
      sku: this.editingProduct.sku,
      name: this.editingProduct.name,
      price: this.editingProduct.price
    };

    this.http.put(`http://localhost:3002/api/products/updateProduct/${this.editingProductId}`, updatedData)
      .subscribe(
        () => {
          this.loadProducts();
          this.cancelEditing();
        },
        error => console.error('Error updating product:', error)
      );
  }

  deleteProduct(product: any) {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.http.delete(`http://localhost:3002/api/products/deleteProduct/${product._id}`)
        .subscribe(
          () => this.loadProducts(),
          error => console.error('Error deleting product:', error)
        );
    }
  }
}
