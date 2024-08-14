import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string;
  password: string;
  testCred: any;
  credentials = {
    email: 'test@test.com',
    password: 'test@123',
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/profile']);
      },
      (err) => console.log(err)
    );
  }

  loginWithTest() {
    if (this.testCred) {
      const credentials = { email: 'test@test.com', password: 'test@123' };
      this.email = credentials.email;
      this.password = credentials.password;
    } else {
      this.email = '';
      this.password = '';
    }
  }
}
