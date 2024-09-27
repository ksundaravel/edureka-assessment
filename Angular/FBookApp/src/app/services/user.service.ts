import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, forkJoin, map, Observable, retry, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { IUser, IUserWithRequest } from "../models/iuser";
import { ErrorsService } from "./errors.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  apiUrl: string = "";
  errorService = inject(ErrorsService);
  //apiUrl:string = "https://dummy.restapiexample.com/api/v1"
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiEndPoint;
  }

  getAllUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.apiUrl + "/users").pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorService.handleError) // then handle the error
    );
  }

  getLoggedInUser() {
    const userSession = localStorage.getItem("user");
    return userSession ? JSON.parse(userSession) : null;
  }

  getUserById(id: string | number): Observable<IUser> {
    return this.httpClient.get<IUser>(this.apiUrl + "/users/" + id).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorService.handleError) // then handle the error
    );
  }

  getOtherUsersList(id: number | string): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.apiUrl + "/users").pipe(
      retry(3), // retry a failed request up to 3 times
      map((users: IUser[]) => {
        return users.filter((user) => user.id !== id);
      }),
      catchError(this.errorService.handleError) // then handle the error
    );
  }

  getRequestUsersList(id: number | string): Observable<IUser[]> {
    return this.httpClient.get<any>(this.apiUrl + "/friendsRequest").pipe(
      retry(3), // retry a failed request up to 3 times
      map((users: any[]) => {
        return users.filter((user) => user.requestedBy !== id);
      }),
      catchError(this.errorService.handleError) // then handle the error
    );
  }

  getOtherUsersListmerge(id: number | string): Observable<IUserWithRequest[]> {
    const users$ = this.httpClient.get<IUser[]>(this.apiUrl + "/users");
    const request$ = this.httpClient.get<any[]>(
      this.apiUrl + "/friendsRequest"
    );

    return forkJoin([users$, request$]).pipe(
      map(([users, request]) => {
        const filteredUsers = users.filter((user) => user.id !== id);
        return filteredUsers.map((user) => {
          const requestDetails = request.find(
            (req) => req.requestedBy === id || req.requestedTo === id
          );
          return {
            userDetails: user,
            requestedDetails: (requestDetails)?requestDetails:null,
          };
        });
      })
    );
  }

  // getOtherUsersList(id: number | string):Observable<any> {
  //   return this.httpClient.get<IUser[]>(this.apiUrl+"/users").pipe(
  //     retry(3), // retry a failed request up to 3 times
  //     map((users:IUser[])=>{
  //       const usersList = users.filter(user=> user.id !== id)
  //       return forkJoin(usersList.map(userId => {
  //         this.httpClient.get(this.apiUrl + "/friendsRequest").pipe(map(res=> users.map(u=>({
  //           ...u,
  //           users: users.find(user=> u.id === user.id)
  //         }))))
  //       }))
  //     }),
  //     catchError(this.errorService.handleError) // then handle the error
  //   )
  // }

  addPost(payload: any) {
    return this.httpClient.post(this.apiUrl + "/posts", payload).pipe(
      catchError(this.errorService.handleError) // then handle the error
    );
  }

  sendFriendRequest(payload: any) {
    return this.httpClient.post(this.apiUrl + "/friendsRequest", payload).pipe(
      catchError(this.errorService.handleError) // then handle the error
    );
  }

  getFriendRequestStatus(requestedBy: any, requestedTo: any) {
    return this.httpClient.get<any[]>(this.apiUrl + "/friendsRequest").pipe(
      map((requests) => {
        return requests.filter(
          (request) =>
            request.requestedBy === requestedBy ||
            request.requestedTo === requestedTo
        );
      }),
      catchError(this.errorService.handleError) // then handle the error
    );
  }
}
