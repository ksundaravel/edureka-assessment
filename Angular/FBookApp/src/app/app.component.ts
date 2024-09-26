import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthService } from './services/auth.service';

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
  authService = inject(AuthService);
  constructor(){
    this.authService.getRole().subscribe((res) => {
      if (!res.role) {
        const sessionUser = localStorage.getItem("user");
        if(sessionUser){
          const {fullname, role, id} = JSON.parse(sessionUser);
          this.authService.setRole({fullname,role,id});
        }
      }
    });


  }
}
