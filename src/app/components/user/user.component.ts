import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];

  user = {
    username: '',
    email: '',
    password: ''
  }

  constructor(
    private peticionesService: PeticionesService,
    private router: Router
    ) { }
  
  //Ordena obtener los 'heroes' cuando se inicializa la pagina
  ngOnInit(): void {
    this.getUsers();
  }
  // Obtiene los 'heroes' proporcionados por el HeroService que a la vez le llegan del fichero de mock heroes
  getUsers(): void {
    this.peticionesService.getUsers()
    .subscribe(users => this.users = users);
  }
  //addUser method
  add() {
    this.peticionesService.addUser(this.user).subscribe((response) => {
      // You can perform actions after adding the user here
      console.log('User added:', response);
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
  // deleteUser method
  // delete(user: User): void {
  //   this.users = this.users.filter(h => h !== user);}
  
  //   // Convierte user._id a número si es un número válido
  //   const userId = parseInt(user._id, 10);
  
  //   // Llama a la función peticionesService.deleteUser() con userId como número
  //   this.peticionesService.deleteUser(userId).subscribe();
  // 
