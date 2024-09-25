import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  apiUrl: string = "";
  menuItems: any[] = [];
  jwtHelper = new JwtHelperService();
  httpClient = inject(HttpClient);
  errorService = inject(ErrorsService);

  constructor(private router: Router) {
    this.apiUrl = environment.apiEndPoint;
  }

  addPost(payload: any) {
    return this.httpClient.post(this.apiUrl + "/posts", payload).pipe(
      catchError(this.errorService.handleError) // then handle the error
    );
  }
}
