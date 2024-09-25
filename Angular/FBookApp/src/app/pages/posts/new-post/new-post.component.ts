import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { IUserLoggedIn } from '../../../models/iuser';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent implements OnInit {
  postObj!: any;
  loggedUser!:IUserLoggedIn;
  authService = inject(AuthService);
  postsService = inject(PostsService);

  constructor(){
    this.postObj = {
      comments:''
    };
  }

  ngOnInit() {
    this.authService.getRole().subscribe((res) => {
      this.loggedUser = res;
    });
  }

  saveFn(contactUsForm: NgForm){ 
    const {comments} = contactUsForm.value;
    const payload = {
      comments,
      submittedBy:this.loggedUser.fullname,
      submittedId: this.loggedUser.id
    }    
    this.postsService.addPost(payload).subscribe((res)=>{
      this.postObj = {
        comments:''
      };
    });
  }
  
}
