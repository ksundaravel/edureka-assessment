import { Component, inject } from '@angular/core';
import { IPosts } from '../../../models/iposts';
import { Observable } from 'rxjs';
import { PostsService } from '../../../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-existing-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './existing-posts.component.html',
  styleUrl: './existing-posts.component.scss'
})
export class ExistingPostsComponent {
  msg: string= '';
  errorMsg: string = '';
  postsList$!: Observable<IPosts[]>;
  postService = inject(PostsService);
  constructor(){}
  ngOnInit(){
    this.getAllPosts();
  }

  getAllPosts(){
    this.postsList$ =  this.postService.getAllPosts();
  }
}
