import { Component, EventEmitter, inject, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { IUserLoggedIn, IUserWithRequest } from '../../models/iuser';
import { MyPostsComponent } from '../posts/my-posts/my-posts.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [MyPostsComponent, CommonModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {
  loggedUser!: IUserLoggedIn;
  userList$: Observable<IUserWithRequest[]> = of([]);
  authService = inject(AuthService);
  myApproveCount: number = 0;

  @Output() dataSubmitted = new EventEmitter<void>();

  constructor(private userService: UserService) {
    this.authService.getRole().subscribe((res) => {
      if (res.role) {
        this.loggedUser = res;
      }
    });
  }

  ngOnInit() {
    this.userService.getApprovedUsersRequest(this.loggedUser.id).then((res)=>{
      this.userList$ = res;
    })

  }

}
