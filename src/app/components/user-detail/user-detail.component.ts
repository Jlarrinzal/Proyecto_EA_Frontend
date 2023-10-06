import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  user: User | undefined;


  constructor(    
    private peticionesService: PeticionesService,
    private route: ActivatedRoute,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    const username = String(this.route.snapshot.paramMap.get('username'));
    this.peticionesService.getUser(username)
      .subscribe(user => this.user = user);
  }
}
