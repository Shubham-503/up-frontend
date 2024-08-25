import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.css'],
})
export class ChallengeCardComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() duration: string;
  @Input() Id: string;
}
