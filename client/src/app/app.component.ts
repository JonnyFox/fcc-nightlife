import { Component, OnInit, NgZone } from '@angular/core';

import { IdentityService } from './shared/identity.service';
import { Identity } from './shared/models';
import { TokenService } from './shared/services';
import { Router } from "@angular/router";

declare var gapi: any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public identity: Identity;

    public googleLoginButtonId = 'google-login-button';

    constructor(
        private router: Router,
        private identityService: IdentityService,
        private zone: NgZone,
        private identitySvc: IdentityService,
        private tokenSvc: TokenService
    ) { }

    ngOnInit(): void {
        this.identityService.$identity
            .subscribe(identity => this.identity = identity);
    }

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
            this.identitySvc.setIdentity({
                id: profile.getId(),
                name: profile.getName(),
                email: profile.getEmail(),
                imageUrl: profile.getImageUrl()
            });
            this.router.navigate(['/dashboard']);
        });
    }
}
