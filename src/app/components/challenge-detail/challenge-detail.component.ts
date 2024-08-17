import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.css'],
})
export class ChallengeDetailComponent {
  challenge: any;
  userProgress: any[] = [];
  today: string = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id !== null &&
      this.challengeService.getChallenge(id).subscribe((data) => {
        this.challenge = data;
      });

    this.loadUserProgress();
  }

  enroll() {
    const id = this.route.snapshot.paramMap.get('id');
    id !== null &&
      this.challengeService.enrollInChallenge(id).subscribe((response) => {
        alert('Enrolled successfully!');
      });
  }

  loadUserProgress(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id !== null &&
      this.challengeService.getProgress(id).subscribe((data) => {
        this.userProgress = data;
      });
  }

  markProgress(completed: boolean): void {
    this.http
      .post(
        'http://127.0.0.1:5000/api/v1/challenges/66c01efbf6583bd2305be8be/tasks/66c01efbf6583bd2305be8c3/toggle-task',
        {}
      )
      .subscribe(() => {
        console.log('req sent succesfully');
      });
    const id = this.route.snapshot.paramMap.get('id');
    id !== null &&
      this.challengeService
        .updateProgress(id, { date: this.today, completed })
        .subscribe(() => {
          this.loadUserProgress();
        });
  }

  isCompleted(date: string): boolean {
    return !!this.userProgress.find(
      (p) =>
        new Date(p.date).toDateString() === new Date(date).toDateString() &&
        p.completed
    );
  }
}
