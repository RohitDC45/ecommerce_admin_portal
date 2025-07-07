import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [CommonModule,FormsModule],
})
export class ProductFormComponent {
  sku = '';
  name = '';
  price: number | null = null;
  files: File[] = [];

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.files = Array.from(event.target.files);
  }

  submit() {
    if (!this.sku || !this.name || !this.price || this.files.length === 0) {
      alert('Please fill all fields and select at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('sku', this.sku);
    formData.append('name', this.name);
    formData.append('price', this.price.toString());
    this.files.forEach(file => formData.append('images', file));

    this.http.post('http://localhost:3002/api/products/createProduct', formData).subscribe(
      () => {
        alert('Product added successfully');
        this.sku = '';
        this.name = '';
        this.price = null;
        this.files = [];
      },
      error => {
        console.error('Error adding product:', error);
        alert('Error adding product');
      }
    );
  }
}
