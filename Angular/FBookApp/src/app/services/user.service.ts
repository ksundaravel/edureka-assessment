import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string = "";
  //apiUrl:string = "https://dummy.restapiexample.com/api/v1"
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiEndPoint+"/users";
  }

  getAllUser():Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.apiUrl).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Please try after sometime. Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
