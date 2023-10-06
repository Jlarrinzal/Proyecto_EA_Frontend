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

  //The heroes web API expects a special header in HTTP save requests:
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private usersUrl = 'http://localhost:9090/users';  // URL to web api
   
  /** GET users from the server */
  getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.usersUrl + '/readall')
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  /** getUsers(): Observable<User[]> {
    const heroes = of(USERS);
    this.messageService.add('UserService: fetched users');
    return heroes;
  } **/

  /** getUser(id: number): Observable<User> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const user = USERS.find(h => h.id === id)!;
    this.messageService.add(`UserService: fetched id = ${id}`);
    return of(user);
  } **/

  /** GET hero by id. Will 404 if id not found */
  getUser(_id: string): Observable<User> {
    const url = `${this.usersUrl}/readuser/${_id}`;
    return this.http.get<User>(url)
  }
  /** PUT: update the hero on the server */
/*   updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user._id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  } */
  /** POST: add a new hero to the server */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl + '/createuser', user);
  }
  /** DELETE: delete the hero from the server */
  deleteUser(_id: number): Observable<User> {
    const url = `${this.usersUrl}/${_id}`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${_id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found users matching "${term}"`) :
        this.log(`no users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {

  }
}