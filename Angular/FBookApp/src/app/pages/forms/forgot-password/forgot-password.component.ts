import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import Validation from "../../../helpers/validation";
import { IUser } from "../../../models/iuser";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  selectedUserForgotPassword: IUser | null = null;
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
          console.log("kkii:",res);
          this.errorMsg = "";
          this.selectedUserForgotPassword = {...res};
          console.log("kkii:",this.selectedUserForgotPassword);
          this.showPasswordFields = true;
        } else {
          this.errorMsg = "User not fount!!";
          this.showPasswordFields = false;
          this.forgotPasswordForm.reset();
        }
      });
  }
  onChangeFn() {
    const { password } = this.passwordChangeForm.value;
    const payload = {...this.selectedUserForgotPassword,password };
    console.log(payload);
    this.authService.changePassword(payload).subscribe({
      next: (res) => {
        if(res){
          this.selectedUserForgotPassword= null;
          this.msg = "Password change successully completed!!!";
          this.errorMsg = "";
          this.passwordChangeCompleted = true;
          this.passwordChangeForm.reset();
        }else{
          console.log("No response");
        }
      },
      error: (e) => {
        this.errorMsg = "Password change failed!!!";
        this.msg = "";
        console.log(e);
      },
      complete: () => {
        console.log("Password change completed");
      },
    });
  }
}
