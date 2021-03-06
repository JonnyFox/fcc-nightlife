import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BaseService } from './base.service';
import { Place } from './models';
import { Observable } from "rxjs/Observable";
import { environment } from '../../environments/environment.prod';

@Injectable()
export class PlaceService extends BaseService<Place> {
    constructor(protected http: Http) {
        super(http, environment.appUrl + 'api/places');
    }

    public search(query: string): Observable<{ results: google.maps.places.PlaceResult[] }> {
        return this.http.get(`${this.serviceUrl}/search/${query}`)
            .map<Response, { results: google.maps.places.PlaceResult[] }> (this.extractData)
            .catch(this.handleError);
    }
}
