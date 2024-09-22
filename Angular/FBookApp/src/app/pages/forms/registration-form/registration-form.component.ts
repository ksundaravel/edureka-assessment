import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import Validation from "../../../helpers/validation";

@Component({
  selector: "app-registration-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./registration-form.component.html",
  styleUrl: "./registration-form.component.scss",
})
export class RegistrationFormComponent {
  msg: string= '';
  errorMsg: string = '';
  userForm: FormGroup;
  http = inject(HttpClient);
  authService = inject(AuthService);
  constructor() {
    this.userForm = new FormGroup(
      {
        fullname: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
        ]),
        dob: new FormControl("", [
          Validators.required,
        ]),
        address: new FormControl("", [Validators.required]),
        city: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
        phoneno: new FormControl("", [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
        ]),
        password: new FormControl("", [Validators.required]),
        confirm_password: new FormControl("", [Validators.required]),
        acceptedTerms: new FormControl("", [Validators.required]),
      },
      {
        validators: Validation.passwordMatchValidator,
      }
    );
  }
  onSubmit() {
    const {fullname,dob,address,city,email,phoneno,password} =this.userForm.value;
    const payload = {fullname,dob,address,city,email,phoneno,password,'role':'user','status':'Active'};
    this.authService.registerUser(payload).subscribe({
      next: (res) => {
        if(res){
          this.msg = "Registration successully completed!!!";
          this.errorMsg = "";
          this.userForm.reset();
        }else{
          console.log("No response");
        }
      },
      error: (e) => {
        this.errorMsg = "Registration failed!!!";
        this.msg = "";
        console.log(e);
      },
      complete: () => {
        console.log("Registration completed");
      },
    });
  }
}
