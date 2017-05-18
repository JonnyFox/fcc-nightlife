import { ObjectID } from '@types/mongodb';
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

    public async findPlaces(query: string): Promise<google.maps.places.PlaceResult[]> {
        let gPlacesResponse = await this.findGooglePlaces(query);
        let gPlaces: google.maps.places.PlaceResult[] = [];
        if (gPlacesResponse) {
            let gPlacesResponseObj = JSON.parse(gPlacesResponse);
            const gPlacesResults: google.maps.places.PlaceResult[] = gPlacesResponseObj.results;
            if (gPlacesResults && gPlacesResults.length) {
                const placesIds = gPlacesResults.map(p => p.place_id);
                let collection = await this.getCollection();
                if (collection) {
                    const dbPlaces = await <any>collection.find({ _id: { $in: placesIds } }).toArray();
                    gPlaces = gPlacesResults
                        .map((place: google.maps.places.PlaceResult) => {
                            let dbPlace = dbPlaces.find((dbPlace: any) => dbPlace._id == place.place_id);
                            (<any>place).people = [];
                            if (dbPlace) {
                                (<any>place).people = dbPlace.people;
                            }
                            return place;
                        })
                }
            }
        }
        return gPlaces;
    }

    public findGooglePlaces(query: string): request.RequestPromise {
        return request.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=bar+near+${query}&key=${this.configService.googleApi.key}`);
    }

    public getPlacePhoto(id: string): request.RequestPromise {
        return request.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${id}&key=${this.configService.googleApi.key}`);
    }
}
