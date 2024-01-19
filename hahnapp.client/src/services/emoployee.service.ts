import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../configuration/environments';

@Injectable({
  providedIn: 'root'
})
export class EmoployeeService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }
}
