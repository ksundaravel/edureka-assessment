import { Component, inject, OnInit } from '@angular/core';
import { IUserLoggedIn } from '../../../models/iuser';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { Observable } from 'rxjs';
import { IPosts } from '../../../models/iposts';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss'
})
export class MyPostsComponent implements OnInit {
  loggedUser!: IUserLoggedIn;
  authService = inject(AuthService);
  postService = inject(PostsService);
  userService = inject(UserService);
  myPostCount: number = 0;
  myApproveCount: number = 0;
  postsList$!: Observable<IPosts[]>;
  constructor(){
    this.authService.getRole().subscribe((res) => {
      if (res.role) {
        this.loggedUser = res;
      }
    });
  }

  ngOnInit(){
    this.getMyPosts();
    this.getMyApprovedFriends();
  }

  getMyPosts(){
    this.postService.getAllPostsById(this.loggedUser.id).subscribe(res =>{
      this.myPostCount = res.length;
    });
  }

  getMyApprovedFriends() {
    this.userService.getApprovedFriendsRequest(this.loggedUser.id).subscribe(res=>{
      this.myApproveCount = res.length;
    });
  }
}
