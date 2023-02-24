import { Injectable } from '@angular/core';
import { environment as env } from '../../environment/environment';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 
  constructor(private http:HttpClient) { }

  public searchMovieByTitle(title:string): Observable<Movie>{
    const url = `${env.apis.apiUrl}/GetMovieByTitle/${title}`;
    return this.http.get<Movie>(url).pipe(retry(1), catchError(this.handleError));
  }

  public getMovieById(id:string): Observable<Movie>{
    const url = `${env.apis.apiUrl}/GetMovieById/${id}`;
    return this.http.get<Movie>(url).pipe(retry(1), catchError(this.handleError));
  }

  public getSearchHistory(): Observable<Movie[]>{
    const url = `${env.apis.apiUrl}/SearchHistory`;
    return this.http.get<Movie[]>(url).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      console.log(errorMessage);
      return errorMessage;
    });
  }
}
