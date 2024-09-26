import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../models/iuser';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string = "";
  errorService = inject(ErrorsService);
  //apiUrl:string = "https://dummy.restapiexample.com/api/v1"
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiEndPoint;
  }

  getAllUsers():Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.apiUrl+"/users").pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorService.handleError) // then handle the error
    )
  }

  getLoggedInUser(){
    const userSession = localStorage.getItem("user");
    return userSession? JSON.parse(userSession):null;
  }

  getUserById(id:string):Observable<IUser> {
    return this.httpClient.get<IUser>(this.apiUrl+"/users/"+id).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorService.handleError) // then handle the error
    )
  }

  getOtherUsersList(id: number | string):Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.apiUrl+"/users").pipe(
      retry(3), // retry a failed request up to 3 times
      map((users:IUser[])=>{
        return users.filter(user=> user.id !== id)
      }),
      catchError(this.errorService.handleError) // then handle the error
    )
  }
}
