import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  private baseUrl = 'http://localhost:5000/api/challenges';

  constructor(private http: HttpClient) {}

  getChallenges(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getChallenge(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  enrollInChallenge(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/enroll`, {});
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
