import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { ChallengesListComponent } from './components/challenges-list/challenges-list.component';
import { ChallengeDetailComponent } from './components/challenge-detail/challenge-detail.component';
import { ChallengeFormComponent } from './components/challenge-form/challenge-form.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] }, //
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'challenges', component: ChallengesListComponent },
  { path: 'challenge/:id', component: ChallengeDetailComponent },
  { path: 'challenge', component: ChallengeFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
