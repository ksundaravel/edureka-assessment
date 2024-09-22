import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./login-form.component.html",
  styleUrl: "./login-form.component.scss",
})
export class LoginFormComponent {
  loginForm: FormGroup;
  errorMsg = "";
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmitFn() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.accessToken) {
          this.errorMsg = "";
          this.authService.isLoggedIn = true;
          localStorage.setItem("accessToken", JSON.stringify(res.accessToken));
          this.router.navigate(["home"]);
        } else {
          this.errorMsg = res.message;
        }
      },
      error: (e) => {
        this.errorMsg = e.message;
      },
      complete: () => {
        console.log("Login completed");
      },
    });
  }
}
