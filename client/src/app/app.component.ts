import { Component } from '@angular/core';

import { IdentityService } from './shared/identity.service';
import { Identity } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public identity: Identity;

  constructor(
    identitySvc: IdentityService
  ) {
    this.identity = identitySvc.identity;
  }
}
