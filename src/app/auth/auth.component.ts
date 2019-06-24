import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  loginMode = true;
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(authForm: NgForm) {
    this.loading = true;
    console.log(authForm.value);
    if (this.loginMode) {
      this.loading = false;
    } else {
      this.authService.signup(authForm.value).subscribe({
        next: signupData => console.log(signupData),
        error: err => {
          this.errorMessage = err;
          this.loading = false;
        },
        complete: () => {
          console.log('success!');
          this.errorMessage = '';
          this.loading = false;
        }

      });
    }
  }

}
