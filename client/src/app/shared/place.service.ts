import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BaseService } from './base.service';
import { Place } from './models';
import { Observable } from "rxjs/Observable";

@Injectable()
export class PlaceService extends BaseService<Place> {
    constructor(protected http: Http) {
        super(http, 'http://localhost:8999/api/places');
    }

    public search(query: string): Observable<{ results: google.maps.places.PlaceResult[] }> {
        return this.http.get(`${this.serviceUrl}/search/${query}`)
            .map<Response, { results: google.maps.places.PlaceResult[] }> (this.extractData)
            .catch(this.handleError);
    }
}
