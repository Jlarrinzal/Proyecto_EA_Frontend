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
  private usersUrl = 'http://localhost:9090/users'; 
   
  /** GET users from the server */
  getUsers(page:number): Observable<User[]> {
   const params = {
    page: page.toString(),
   };
  return this.http.get<User[]>(this.usersUrl + '/readall/', {params});
   }

  /** GET user by Id */
  getUser(id: string): Observable<User> {
    const url = `${this.usersUrl}/readuser/${id}`;
    return this.http.get<User>(url)
  }

  /** PUT: update the user on the server */
  updateUser(id: string, user: User): Observable<User> {
    const url = `${this.usersUrl}/updateuser/${id}`;
    return this.http.put<User>(url, user);
  }

  /** POST: add a new user to the server */
  addUser(user: any): Observable<User> {
    return this.http.post<User>(this.usersUrl + '/createuser', user);
  }
  
  /** DELETE: delete the user from the server */
  deleteUser(_id: string): Observable<User> {
    const url = `${this.usersUrl}/deleteuser/${_id}`;
    return this.http.delete<User>(url);
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/?name=${term}`);
  }
}