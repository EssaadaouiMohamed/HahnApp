import { Injectable } from '@angular/core';
import { HttpService } from './http-service-provider.service';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(http: HttpService) { }
}
