import { Injectable } from '@angular/core';
import {
  HttpClient, HttpEvent, HttpHandler, HttpHeaders,
  HttpInterceptor, HttpRequest, HttpErrorResponse, HttpParams
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor {
  private baseUrl = `https://localhost:5001`

  constructor(private http: HttpClient) { }

  // Interceptor method

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwt_token');
    let authReq = req;
    // Clone the request to add the new header if the JWT token exists
    if (jwtToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwtToken}`)
      });
    }

    // Handle the request
    return next.handle(authReq).pipe(catchError(this.handleError));
  }

  // Generic GET method
  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${ this.baseUrl }/${ url }`, { params, headers });
  }

  // Generic POST method
  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    let response = this.http.post<T>(`${ this.baseUrl }/${ url }`, body, { headers });
    return response;
  }

  // Generic PUT method
  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${ this.baseUrl }/${ url }`, body, { headers });
  }

  // Generic DELETE method
  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(`${ this.baseUrl }/${ url }`, { headers });
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    // User-facing error message or a fallback
    const errorMessage = error.error.message || 'Unable to complete the request.';
    // Log to the console or send to logging infrastructure
    console.error(`Backend returned code ${ error.status }, body was: `, error.error);
    // Throw an observable with a user-facing error message
    return throwError(() => new Error(errorMessage));
  }
}
