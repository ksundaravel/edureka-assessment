import { Component, inject, OnInit } from "@angular/core";
import { MyPostsComponent } from "../posts/my-posts/my-posts.component";
import { UserService } from "../../services/user.service";
import { IUser, IUserLoggedIn } from "../../models/iuser";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-my-profile",
  standalone: true,
  imports: [MyPostsComponent],
  templateUrl: "./my-profile.component.html",
  styleUrl: "./my-profile.component.scss",
})
export class MyProfileComponent implements OnInit {
  userService = inject(UserService);
  userData!: IUser;
  loggedUser!: IUserLoggedIn;
  authService = inject(AuthService);

  constructor() {
    this.authService.getRole().subscribe((res) => {
      if (res.role) {
        this.loggedUser = res;
      }
    });
  }

  ngOnInit() {
    this.userService.getUserById(this.loggedUser.id).subscribe(res=>{
      this.userData = res;
      console.log(res);
    })
  }
}
