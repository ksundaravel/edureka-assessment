import { Component, EventEmitter, inject, Input, OnInit, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import Validation from "../../../helpers/validation";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../services/auth.service";
import { IUser } from "../../../models/iuser";

@Component({
  selector: "app-change-password",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./change-password.component.html",
  styleUrl: "./change-password.component.scss",
})
export class ChangePasswordComponent implements OnInit {
  passwordChangeForm: FormGroup;
  errorMsg: string;
  msg: string;
  authService = inject(AuthService);
  @Input() selectedUser: number = 0;
  @Output() actionFn: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {
    this.msg = "";
    this.errorMsg = "";
    this.passwordChangeForm = new FormGroup(
      {
        password: new FormControl("", [Validators.required]),
        confirm_password: new FormControl("", [Validators.required]),
      },
      {
        validators: Validation.passwordMatchValidator,
      }
    );
  }

  ngOnInit(){

    console.log(this.selectedUser);
  }

  onSubmitFn() {
    const { password } = this.passwordChangeForm.value;
    const payload = { password, id: this.selectedUser };
    this.authService.changePassword(payload).subscribe({
      next: (res) => {
        if (res) {
          this.actionFn.emit(true);
        } else {
          this.actionFn.emit(false);
        }
      },
      error: (e) => {
        this.actionFn.emit(false);
      },
      complete: () => {
        console.log("Password change completed");
      },
    });
  }
}
