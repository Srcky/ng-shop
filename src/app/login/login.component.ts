import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopApiService } from '../services/shop-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private shopApiService: ShopApiService
  ) {}

  loginForm: FormGroup = new FormGroup({});
  sending = false;
  emailPattern = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: '',
    });
  }

  submitForm() {
    this.sending = true;
    console.log(this.loginForm);
  }
}
