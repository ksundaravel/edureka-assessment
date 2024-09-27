import { Component, inject, OnInit } from "@angular/core";
import { MyPostsComponent } from "../posts/my-posts/my-posts.component";
import { UserService } from "../../services/user.service";
import { IUser, IUserLoggedIn } from "../../models/iuser";
import { AuthService } from "../../services/auth.service";
import { ChangePasswordComponent } from "../forms/change-password/change-password.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-my-profile",
  standalone: true,
  imports: [MyPostsComponent,ChangePasswordComponent, CommonModule],
  templateUrl: "./my-profile.component.html",
  styleUrl: "./my-profile.component.scss",
})
export class MyProfileComponent implements OnInit {

  errorMsg: string;
  msg: string;

  userService = inject(UserService);
  userData!: IUser;
  loggedUser!: IUserLoggedIn;
  authService = inject(AuthService);
  showPasswordFields: boolean = false;

  constructor() {
    this.msg = "";
    this.errorMsg = "";
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

  onShowPasswordForm(){
    this.showPasswordFields= true;
  }

  onChangeFn(value: boolean) {
    if(value) {
      this.msg = "Password change successully completed!!!";
      this.errorMsg = "";
    }else{
      this.errorMsg = "Password change failed!!!";
      this.msg = "";
    }
  }

}
