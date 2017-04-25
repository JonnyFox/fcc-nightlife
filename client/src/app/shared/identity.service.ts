import { Injectable } from '@angular/core';

import { Identity } from './models';

@Injectable()
export class IdentityService {
    public identity: Identity;
}
