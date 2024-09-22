import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { UsersComponent } from './pages/users/users.component';
const components = [UsersComponent,HeaderComponent,FooterComponent];
const modules = [RouterOutlet,CommonModule,RouterModule]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [modules, components],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FBookApp';
}
