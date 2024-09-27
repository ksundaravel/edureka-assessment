import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { ErrorsService } from './errors.service';
import { IPosts } from '../models/iposts';

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

  getAllPosts():Observable<IPosts[]> {
    return this.httpClient.get<IPosts[]>(this.apiUrl+"/posts?_sort=submittedOn&_order=desc").pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorService.handleError) // then handle the error
    )
  }

  getAllPostsById(id: number):Observable<IPosts[]> {
    return this.httpClient.get<IPosts[]>(this.apiUrl+"/posts").pipe(
      map((posts)=>{
        return posts.filter(post=> +post.submittedId === id)
      }),
      catchError(this.errorService.handleError) // then handle the error
    )
  }
}
