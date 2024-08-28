import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChallengeService } from 'src/app/services/challenge.service';

export enum TasksVisibility {
  All = 'all',
  Unlock = 'unlock',
  Enrolled = 'enrolled',
}

@Component({
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrls: ['./challenge-form.component.css'],
})
export class ChallengeFormComponent {
  challengeForm: FormGroup;
  tempDesc: string;
  submittedContent: SafeHtml | any;
  tasksVisibility: any = [];

  constructor(
    private fb: FormBuilder,
    private challengeService: ChallengeService,
    private sanitizer: DomSanitizer
  ) {
    this.challengeForm = this.fb.group({
      title: ['Title from ui', Validators.required],
      description: ['hey', Validators.required],
      tasks: this.fb.array([]),
      startDate: ['', Validators.required],
      duration: ['', Validators.required],
      tasksVisibility: [TasksVisibility.All, Validators.required],
    });

    this.tasksVisibility = Object.keys(TasksVisibility).map((key) => ({
      key,
      value: TasksVisibility[key as keyof typeof TasksVisibility],
    }));
    console.log(this.tasksVisibility);
    // Start with one task by default
    this.addTask(0);
  }

  get tasks(): FormArray {
    return this.challengeForm.get('tasks') as FormArray;
  }

  addTask(i = 0): void {
    const taskGroup = this.fb.group({
      title: ['task title from ui', Validators.required],
      description: ['task desc from ui', Validators.required],
      rewards: [i],
      unlockDate: ['', Validators.required],
      status: ['', Validators.required],
      // unlockDate: ['', Validators.required],
    });

    this.tasks.push(taskGroup);
  }

  removeTask(index: number): void {
    this.tasks.removeAt(index);
  }

  onSubmit(): void {
    // this.submittedContent = this.sanitizer.bypassSecurityTrustHtml(
    //   this.challengeForm.value
    // );
    // console.log('Challenge Data:', this.challengeForm.value);
    // console.log('submitted content', this.submittedContent);
    this.submittedContent = this.sanitizer.bypassSecurityTrustHtml(
      this.challengeForm.value
    );
    console.log('submittedContent: ', this.submittedContent);

    if (this.challengeForm.valid) {
      this.challengeService
        .createChallenge(
          this.submittedContent.changingThisBreaksApplicationSecurity
        )
        .subscribe();

      console.log('Challenge Data:', this.challengeForm.value);
    }
  }
}

// {
//   "changingThisBreaksApplicationSecurity": {
//       "title": "30 days of fitness ",
//       "description": "<h1>Fitness Challenge</h1><ol><li><strong>wake up on time</strong></li><li>stretching</li><li>do gym</li></ol>",
//       "tasks": [
//           {
//               "title": "wake up on time",
//               "description": "<h3>Waking up on time can be a good start</h3><p>Ping your <strong>progress in chat</strong></p>",
//               "rewards": 0,
//               "unlockDate": "2024-08-29",
//               "status": "locked"
//           },
//           {
//               "title": "stretching",
//               "description": "<h3>Stretching can be a good start</h3><p>Ping your <strong>progress in chat</strong></p>",
//               "rewards": 1,
//               "unlockDate": "2024-08-30",
//               "status": "locked"
//           }
//       ],
//       "startDate": "2024-08-13",
//       "duration": 30,
//       "tasksVisibility": "all"
//   }
// }
