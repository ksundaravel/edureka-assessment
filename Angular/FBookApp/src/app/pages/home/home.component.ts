import { Component, inject, ViewChild } from "@angular/core";
import { NewPostComponent } from "../posts/new-post/new-post.component";
import { ExistingPostsComponent } from "../posts/existing-posts/existing-posts.component";
import { MyPostsComponent } from "../posts/my-posts/my-posts.component";
import { AuthService } from "../../services/auth.service";
import { IUserLoggedIn } from "../../models/iuser";
import { NetworkComponent } from "../network/network.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [NewPostComponent, ExistingPostsComponent, MyPostsComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {

  @ViewChild(ExistingPostsComponent)
  existingPostsComponent!: ExistingPostsComponent;

  @ViewChild(MyPostsComponent)
  myPostsComponent!: MyPostsComponent;

  loggedUser!: IUserLoggedIn;
  authService = inject(AuthService);

  constructor(){
    this.authService.getRole().subscribe((res) => {
      if (res.role) {
        this.loggedUser = res;
      }
    });
  }

  onDataSubmitted() {
    this.existingPostsComponent.getAllPosts();
    this.myPostsComponent.getMyPosts();
    this.myPostsComponent.getMyApprovedFriends();
  }
}
