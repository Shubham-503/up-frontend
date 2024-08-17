import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:5000/api/v1/users/profile')
      .subscribe((data) => (this.user = data));
  }
  logout() {
    this.authService.logout();
  }
}
