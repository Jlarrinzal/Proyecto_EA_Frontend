import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  products: Product[] = [];

  product: any = {
   name: '',
   description: '',
   price: '',
   units: ''
 } 


 constructor(
   private productService: ProductService,
   private router: Router
   ) { }
 
 //Ordena obtener los 'products' cuando se inicializa la pagina
 ngOnInit(): void {
   this.getProducts();
 }
 // Obtiene los 'products' proporcionados por el ProductService
 getProducts(): void {
   this.productService.getProducts()
   .subscribe(products => this.products = products);
 }
 //addUser method
 add() {
   this.productService.addProduct(this.product).subscribe((response) => {
     // You can perform actions after adding the product here
     console.log('Product added:', response);
     // Clear the input fields after adding
   });
 }

 showAddForm: boolean = false;
showForm() {
 this.showAddForm = true;
}
toggleFormVisibility() {
 this.showAddForm = !this.showAddForm;
}

}
