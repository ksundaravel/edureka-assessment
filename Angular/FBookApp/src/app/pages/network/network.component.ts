import { Component, inject, OnInit } from "@angular/core";
import { MyPostsComponent } from "../posts/my-posts/my-posts.component";
import { CommonModule } from "@angular/common";
import { Observable, of } from "rxjs";
import { IUser, IUserLoggedIn } from "../../models/iuser";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-network",
  standalone: true,
  imports: [MyPostsComponent, CommonModule],
  templateUrl: "./network.component.html",
  styleUrl: "./network.component.scss",
})
export class NetworkComponent implements OnInit {
  loggedUser!: IUserLoggedIn;
  userList$: Observable<IUser[]> = of([]);
  authService = inject(AuthService);
  constructor(private userService: UserService) {
    this.authService.getRole().subscribe((res) => {
      if (res.role) {
        this.loggedUser = res;
      }
    });
  }

  ngOnInit() {
    this.userList$ = this.userService.getOtherUsersList(this.loggedUser.id);
  }

  sendRequest(requestTo: number | string){
    const payload = {
      requestedBy: this.loggedUser.id,
      requestedTo: requestTo,
      requestStatus: 'Pending',
      requestedOn: new Date(),
    };

    this.userService.sendFriendRequest(payload).subscribe((res) => {
      if(res){
       console.log("Successfully request")
      }
    });
  }
}
