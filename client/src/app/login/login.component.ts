import { Component, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { IdentityService, TokenService } from '../shared/services';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  public googleLoginButtonId = 'google-login-button';

  public userAuthToken: string;
  public userDisplayName: string;

  constructor(
    private router: Router,
    private zone: NgZone,
    private identitySvc: IdentityService,
    private tokenSvc: TokenService
  ) { }

  ngAfterViewInit() {
    // Converts the Google login button stub to an actual button.
    gapi.signin2.render(
      this.googleLoginButtonId,
      {
        'onSuccess': (loggedInUser) => this.setLoggedUser(loggedInUser),
        'scope': 'profile',
        'theme': 'dark'
      });
  }

  private setLoggedUser(loggedInUser) {
    this.zone.run(() => {
      this.tokenSvc.token = loggedInUser.getAuthResponse().id_token;
      let profile = loggedInUser.getBasicProfile();
      this.identitySvc.identity = {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl()
      };
      this.router.navigate(['/dashboard']);
    });
  }
}
