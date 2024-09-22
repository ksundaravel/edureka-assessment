import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
const components = [EmployeeListComponent,HeaderComponent,FooterComponent];
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
