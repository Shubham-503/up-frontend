import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrls: ['./challenge-form.component.css'],
})
export class ChallengeFormComponent {
  challengeForm: FormGroup;
  tempDesc: string;
  constructor(
    private fb: FormBuilder,
    private challengeService: ChallengeService
  ) {
    this.challengeForm = this.fb.group({
      title: ['Title from ui', Validators.required],
      description: ['Desc from ui', Validators.required],
      tasks: this.fb.array([]),
      startDate: ['', Validators.required],
      duration: [''],
    });

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
    if (this.challengeForm.valid) {
      // this.challengeService
      //   .createChallenge(this.challengeForm.value)
      //   .subscribe();
      console.log('Challenge Data:', this.challengeForm.value);
      // Here you would typically send the form data to your backend
    }
  }
}
