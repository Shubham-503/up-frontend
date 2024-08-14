import { Component, OnInit } from '@angular/core';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-challenges-list',
  templateUrl: './challenges-list.component.html',
  styleUrls: ['./challenges-list.component.css'],
})
export class ChallengesListComponent implements OnInit {
  challenges: any[] = [];

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.challengeService.getChallenges().subscribe((data: any[]) => {
      this.challenges = data;
    });
  }
}
