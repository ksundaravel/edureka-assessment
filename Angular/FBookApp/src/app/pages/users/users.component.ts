import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HighlightDirective } from "../../directives/highlight.directive";
import { UserService } from "../../services/user.service";
import { Observable, of } from "rxjs";
import { IUser } from "../../models/iuser";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightDirective],
  providers: [UserService],
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.scss",
})
export class UsersComponent implements OnInit {
  msg: string = "";
  errorMsg: string = "";
  userList$: Observable<IUser[]>=of([]);
  userList: IUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUser().subscribe({
      next: (res) => {
        if (res) {
          this.userList = res;
        }
      },
      error: (e) => {
        this.msg = "";
        this.errorMsg = "No success message received from API";
      },
      complete: () => {
        console.log("User list completed");
      },
    });
  }
}
