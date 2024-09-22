import { Component } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IContactusForm } from '../../../models/icontactus-form';

@Component({
  selector: 'app-contact-us-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us-form.component.html',
  styleUrl: './contact-us-form.component.scss'
})
export class ContactUsFormComponent {
  contactObj!: IContactusForm;
  constructor(){
    this.contactObj = {
      fullname: '',
      email: '',
      phoneno: '',
      comments:''
    };
  }

  saveFn(contactUsForm: Form){

  }

}
