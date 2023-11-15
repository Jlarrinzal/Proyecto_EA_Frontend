import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class PeticionesService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  /** private usersURL = 'http://localhost:9090/users';  LOCAL **/
  private usersURL = 'http://km0-api:9090/users'; 
   
  /** GET users from the server */
  getUsers(page:number): Observable<User[]> {
    const token =this.getToken();
    let headers =new HttpHeaders;
    const params = {
    page: page.toString(),
   };
   if (token !== null) {
    headers = headers.set("x-access-token", token);
   } 
    return this.http.get<User[]>(this.usersURL + '/readall/', {params, headers});
     
}

  /** GET user by Id */
  getUser(id: string): Observable<User> {
    const url = `${this.usersURL}/readuser/${id}`;
    return this.http.get<User>(url)
  }

  /** PUT: update the user on the server */
  updateUser(id: string, user: User): Observable<User> {
    const url = `${this.usersURL}/updateuser/${id}`;
    return this.http.put<User>(url, user);
  }

  /** POST: add a new user to the server */
  addUser(user: any): Observable<User> {
    return this.http.post<User>(this.usersURL + '/createuser', user);
  }
  
  /** DELETE: delete the user from the server */
  deleteUser(_id: string): Observable<User> {
    const url = `${this.usersURL}/deleteuser/${_id}`;
    return this.http.delete<User>(url);
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersURL}/?name=${term}`);
  }

  signIn(user: User) { 
    return this.http.post<any>(this.usersURL + '/signin', user);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token')
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/inicio']);
  }
  getRole() {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol; 
    }
    return null; 
  }
}