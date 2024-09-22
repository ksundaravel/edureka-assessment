import { Component } from '@angular/core';
import { ContactUsFormComponent } from '../forms/contact-us-form/contact-us-form.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactUsFormComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

}
