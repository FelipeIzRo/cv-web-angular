import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {

  emailForm;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.emailForm = this.fb.group({
      name: [''],
      email: [''],
      message: ['']
    });
  }

  sendEmail(name: string, email: string, message: string) {
    const url = 'https://formspree.io/f/xlgdraer';

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const data = `name=${name}&email=${email}&message=${message}`;

    this.httpClient.post(url, data, httpOptions).subscribe({
      next: res => console.log('Email enviado', res),
      error: err => console.error('Error', err)
    });
  }
}

