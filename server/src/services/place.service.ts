import { ConfigService } from './config.service';
import { injectable } from 'inversify';
import { DbService, Collections } from './db.service';
import { Place } from '../models';
import { BaseService } from './base.service';
import * as request from 'request-promise';

@injectable()
export class PlaceService extends BaseService<Place>  {
    constructor(protected dbService: DbService, protected configService: ConfigService) {
        super(dbService);
        this.collectionType = Collections.Places;
    }

    public findGooglePlaces(query: string): any {
        return request.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=bar+near+${query}&key=${this.configService.googleApi.key}`);
    }

    public getPlacePhoto(id: string): any { 
        return request.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${id}&key=${this.configService.googleApi.key}`);
    }
}
