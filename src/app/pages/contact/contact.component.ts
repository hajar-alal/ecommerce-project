import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {

    console.log('Form Data:', this.contactData);

    alert("Message sent successfully ✔️");

    // تفريغ الفورم بعد الإرسال
    this.contactData = {
      name: '',
      email: '',
      message: ''
    };
  }

}
