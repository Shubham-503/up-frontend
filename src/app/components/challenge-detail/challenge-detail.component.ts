import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.css'],
})
export class ChallengeDetailComponent {
  challenge: any;

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id !== null &&
      this.challengeService.getChallenge(id).subscribe((data) => {
        this.challenge = data;
      });
  }

  enroll() {
    const id = this.route.snapshot.paramMap.get('id');
    id !== null &&
      this.challengeService.enrollInChallenge(id).subscribe((response) => {
        alert('Enrolled successfully!');
      });
  }
}
