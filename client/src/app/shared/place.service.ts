import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseService } from './base.service';
import { Place } from './models';

@Injectable()
export class PlaceService extends BaseService<Place> {
    constructor(protected http: Http) {
        super(http, 'http://localhost:8999/api/places');
    }
}
