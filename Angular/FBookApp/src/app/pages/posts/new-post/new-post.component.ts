import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, OnInit, Output } from "@angular/core";
import { Form, FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { IUserLoggedIn } from "../../../models/iuser";
import { PostsService } from "../../../services/posts.service";

@Component({
  selector: "app-new-post",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./new-post.component.html",
  styleUrl: "./new-post.component.scss",
})
export class NewPostComponent implements OnInit {
  postObj!: any;
  loggedUser!: IUserLoggedIn;
  authService = inject(AuthService);
  postsService = inject(PostsService);
  @Output() dataSubmitted = new EventEmitter<void>();

  constructor() {
    this.postObj = {
      comments: "",
    };

    this.authService.getRole().subscribe((res) => {
      if (res.role) {
        this.loggedUser = res;
      }
    });
  }

  ngOnInit() {}

  saveFn(contactUsForm: NgForm) {
    const { comments } = contactUsForm.value;
    const payload = {
      comments,
      submittedBy: this.loggedUser.fullname,
      submittedId: this.loggedUser.id,
      submittedOn: new Date(),
    };
    this.postsService.addPost(payload).subscribe((res) => {
      if(res){
        this.postObj = {
          comments: "",
        };
        this.dataSubmitted.emit();
      }
    });
  }
}
