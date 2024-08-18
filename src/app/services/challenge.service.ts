import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  private baseUrl = 'http://localhost:5000/api/v1/challenges';

  constructor(private http: HttpClient) {}

  getChallenges(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getChallenge(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching challenge:', error);
        // Optionally, return an empty object or an appropriate error message
        return of({ userChallenge: { challenge: null, userTasks: [] } });
      })
    );
  }

  enrollInChallenge(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/enroll`, {});
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getProgress(challengeId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${challengeId}/progress`);
  }

  updateProgress(challengeId: string, taskId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${challengeId}/tasks/${taskId}/toggle-task`,
      {}
    );
  }
}
