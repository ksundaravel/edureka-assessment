import { Component } from '@angular/core';
import { NewPostComponent } from '../posts/new-post/new-post.component';
import { ExistingPostsComponent } from '../posts/existing-posts/existing-posts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewPostComponent,ExistingPostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
