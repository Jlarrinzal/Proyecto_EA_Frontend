import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: 'purchase.component.html',
  styleUrls: ['purchase.component.css']
})
export class PurchaseComponent implements OnInit{
  purchases: Purchase[] = [];

  purchase: any = {
   user: '',
   product: '',
   quantity: ''
 } 
 currentPage: number = 1; // Página actual
  totalPages: number = 1; // Número total de páginas
  showAddForm: boolean = false;

 constructor(
   private purchaseService: PurchaseService,
   private router: Router
   ) { }
 
 //Ordena obtener los 'purchases' cuando se inicializa la pagina
 ngOnInit(): void {
   this.getpurchases(this.currentPage);
 }
 // Obtiene los 'purchases' proporcionados por el purchaseService
 getpurchases(page:number): void {
   this.purchaseService.getPurchases(page)
   .subscribe((response: any) => {
    this.purchases = response.docs;
    this.currentPage = response.page;
    this.totalPages = response.totalPages;
  });
   
 }
 //addpurchase method
 add() {
   this.purchaseService.addPurchase(this.purchase).subscribe((response) => {
     // You can perform actions after adding the purchase here
     console.log('purchase added:', response);
     // Clear the input fields after adding
   });
 }

 showForm() {
  this.showAddForm = true;
}
toggleFormVisibility() {
  this.showAddForm = !this.showAddForm;
}

previousPage() {
  if (this.currentPage > 1) {
    this.getpurchases(this.currentPage - 1);
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.getpurchases(this.currentPage + 1);
  }
}

}
