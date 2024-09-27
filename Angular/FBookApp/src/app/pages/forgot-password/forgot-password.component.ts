import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import Validation from "../../helpers/validation";
import { IUser } from "../../models/iuser";
import { ChangePasswordComponent } from "../forms/change-password/change-password.component";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ChangePasswordComponent],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent {
  errorMsg: string;
  msg: string;
  forgotPasswordForm: FormGroup;
  passwordChangeForm: FormGroup;
  showPasswordFields: boolean = false;
  passwordChangeCompleted = false;
  selectedUserForgotPassword: number = 0;
  authService = inject(AuthService);

  constructor() {
    this.msg = "";
    this.errorMsg = "";
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      dob: new FormControl("", [Validators.required]),
    });
    this.passwordChangeForm = new FormGroup({
      password: new FormControl("", [Validators.required]),
      confirm_password: new FormControl("", [Validators.required]),
    },
    {
      validators: Validation.passwordMatchValidator,
    });
  }

  onSubmitFn() {

    this.authService
      .forgotPassword(this.forgotPasswordForm.value)
      .then((res) => {
        if (res) {
          console.log(res);
          this.errorMsg = "";
          this.selectedUserForgotPassword = res.id;
          this.showPasswordFields = true;
        } else {
          this.errorMsg = "User not fount!!";
          this.showPasswordFields = false;
          this.forgotPasswordForm.reset();
        }
      });
  }
  onChangeFn(value: boolean) {
    if(value) {
      this.selectedUserForgotPassword = 0;
      this.msg = "Password change successully completed!!!";
      this.errorMsg = "";
      this.passwordChangeCompleted = true;
      this.passwordChangeForm.reset();
    }else{
      this.errorMsg = "Password change failed!!!";
      this.msg = "";
    }
  }
}
