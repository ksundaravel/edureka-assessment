import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  BehaviorSubject,
  catchError,
  lastValueFrom,
  Observable,
  of,
  retry,
  Subject,
  throwError,
} from "rxjs";
import { environment } from "../../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { IUser, IUserLoggedIn, Roles } from "../models/iuser";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn: boolean;
  userName: string;
  apiUrl: string = "";
  menuItems: any[] = [];
  jwtHelper = new JwtHelperService();
  httpClient = inject(HttpClient);
  userService = inject(UserService);
  private roleSubject = new BehaviorSubject<IUserLoggedIn>({fullname: 'Guest',role:'',id:0});

  constructor(private router: Router) {
    this.isLoggedIn = false;
    this.userName = "";
    this.apiUrl = environment.apiEndPoint;
    console.log("called");
  }



  registerUser(payload: any) {
    return this.httpClient.post(this.apiUrl + "/users", payload).pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  login(payload: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/login", payload).pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  setRole(user: IUserLoggedIn) {
    this.roleSubject.next(user);
  }

  getRole():Observable<IUserLoggedIn> {
    return this.roleSubject.asObservable();
  }

  isUserLoggedIn(): boolean {
    let token = localStorage.getItem("accessToken");
    let user = localStorage.getItem("user");
    return token  != null && !this.jwtHelper.isTokenExpired(token) && user != null;
  }
  logout(): void {
    //this.isLoggedIn = false;
    this.roleSubject.next({fullname: 'Guest',role:'',id:0});
    localStorage.clear();
    this.router.navigate(["login"]);
  }
  getToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  getUserRole(): string | null {
    let token = localStorage.getItem("accessToken");
    return token ? this.decodeToken(token).role : null;
  }

  async forgotPassword(payload: any) {
    const users$ = this.userService.getAllUsers();
    const finalUsers = await lastValueFrom(users$);
    return finalUsers.find(
      (user) => user.email === payload.email && user.dob === payload.dob
    );
  }

  changePassword(payload: any) {
    return this.httpClient.patch(`${this.apiUrl}/users/${payload.id}`, payload);
  }

  private decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An error occurred:", error.error);
    } else {
      console.error(
        `Please try after sometime. Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(() => new Error(error.error));
  }
}
