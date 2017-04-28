import { injectable } from 'inversify';
import { DbService, Collections } from './db.service';
import { Place } from '../models';
import { BaseService } from './base.service';
import * as request from 'request-promise';

@injectable()
export class PlaceService extends BaseService<Place>  {
    constructor(protected dbService: DbService) {
        super(dbService);
        this.collectionType = Collections.Places;
    }

    public findGooglePlaces(query: string): any {
        const apiKey = 'AIzaSyDXWAb18djD5erk0xOfjSF5b-aCG5NSmok';
        return request.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=bar+near+${query}&key=${apiKey}`);
    }
}
