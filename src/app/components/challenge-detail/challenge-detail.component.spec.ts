import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDetailComponent } from './challenge-detail.component';

describe('ChallengeDetailComponent', () => {
  let component: ChallengeDetailComponent;
  let fixture: ComponentFixture<ChallengeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChallengeDetailComponent]
    });
    fixture = TestBed.createComponent(ChallengeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
