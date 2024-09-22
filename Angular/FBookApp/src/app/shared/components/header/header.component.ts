import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { CommonModule } from "@angular/common";
import { Roles } from "../../../models/iuser";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
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
