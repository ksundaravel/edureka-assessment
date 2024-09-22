import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Roles } from '../../../models/iuser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  roles = Roles;
  role: string = '';
  menuItems: any[] = [];
  constructor(public authService: AuthService) {}
  ngOnInit() {
    this.authService.getRole().subscribe((res) => {
      this.role = res;
    });
  }
}
