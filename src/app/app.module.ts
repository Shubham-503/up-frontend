import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { ChallengesListComponent } from './components/challenges-list/challenges-list.component';
import { ChallengeDetailComponent } from './components/challenge-detail/challenge-detail.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ChallengeFormComponent } from './components/challenge-form/challenge-form.component';
import { ChallengeCardComponent } from './components/challenge-card/challenge-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ChallengesListComponent,
    ChallengeDetailComponent,
    ChallengeFormComponent,
    ChallengeCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline'], // toggled buttons
          [{ list: 'ordered' }, { list: 'bullet' }], // lists
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header dropdown
          ['link', 'image'], // link and image
        ],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
