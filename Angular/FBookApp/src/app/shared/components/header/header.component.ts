import { Component, inject, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { CommonModule } from "@angular/common";
import { IUser, IUserLoggedIn, Roles } from "../../../models/iuser";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
  roles = Roles;
  role: string = '';
  menuItems: any[] = [];
  loggedUser:IUserLoggedIn | null;
  userService =inject(UserService);
  constructor(public authService: AuthService) {
    this.loggedUser = null;
  }
  ngOnInit() {
    this.authService.getRole().subscribe((res) => {
      this.loggedUser = res;
    });
    this.loggedUser = this.userService.getLoggedInUser();
  }
}
