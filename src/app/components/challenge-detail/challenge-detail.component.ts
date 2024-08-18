import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, shareReplay, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.css'],
})
export class ChallengeDetailComponent {
  challenge$: Observable<any>;
  userTasks$: Observable<any>;
  userProgress: any[] = [];
  today: string = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  userChallenge$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      // const source$ = this.challengeService.getChallenge(id);

      // this.challenge$ = source$.pipe(map((items) => items.challenge));
      // this.userTasks$ = source$.pipe(map((items) => items.userTask$));
      console.log('just before getChallenge called');

      this.challengeService
        .getChallenge(id)
        .pipe(
          tap(() => {
            console.log('before making observable');
          }),
          map((response) => {
            console.log('logging for response: ', response);
            if (response?.status) {
              console.log('logging from inside if:');
              this.challenge$ = of(response?.userChallenge.challenge);
              this.userTasks$ = of(response?.userChallenge.userTasks);
              return response.userChallenge; // Optional: if you want to use userChallenge directly
            }
            this.challenge$ = of(response);
            this.userTasks$ = of(response?.tasks);
          })
        )
        .subscribe();
    }

    // this.loadUserProgress();
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

  markProgress(taskId: string): void {
    // this.http
    //   .post(
    //     'http://127.0.0.1:5000/api/v1/challenges/66c01efbf6583bd2305be8be/tasks/66c01efbf6583bd2305be8c3/toggle-task',
    //     {}
    //   )
    //   .subscribe(() => {
    //     console.log('req sent succesfully');
    //   });
    const id = this.route.snapshot.paramMap.get('id');
    id !== null &&
      this.challengeService
        .updateProgress(id, taskId)
        .pipe(
          map((response) => {
            this.userTasks$ = of(response.userChallenge.userTasks);
          })
        )
        .subscribe(() => {
          // this.loadUserProgress();
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
