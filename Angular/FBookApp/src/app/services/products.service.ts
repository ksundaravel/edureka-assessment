import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductsAPIResponse } from '../models/iproducts';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl:string = "";
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiEndPoint+"/products";
  }

  getAllProducts():Observable<IProductsAPIResponse> {
    return this.httpClient.get<IProductsAPIResponse>(this.apiUrl).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
  }

  getProducts():Observable<any> {
    return this.httpClient.get<any>(this.apiUrl).pipe(
      retry(3), // retry a failed request up to 3 times
      map( res => res.data),
      catchError(this.handleError) // then handle the error
    )
  }


  getProductsById(id:any):Observable<any>{
    return this.getProducts().pipe(
      map(product => product.find((p:any) => p.id === +id))
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
