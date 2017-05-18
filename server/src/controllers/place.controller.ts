import { Controller, Get, Post, Put, Delete } from 'inversify-express-utils';
import { injectable } from 'inversify';
import { ObjectID } from "@types/mongodb";
import { Request, Response } from 'express';
import { Place } from '../models';
import { PlaceService } from '../services/place.service';

@injectable()
@Controller('/api/places')
export class PlaceController {

    constructor(private placeService: PlaceService) { }

    @Get('/photo/:id')
    public async getPhoto(request: Request, response: Response): Promise<any> {
        let result = await this.placeService.getPlacePhoto(request.params.id);
        return result;
    }

    @Get('/search/:query')
    public async search(request: Request): Promise<google.maps.places.PlaceResult[]> {
        return await this.placeService.findPlaces(request.params.query);
    }

    @Post('')
    public async post(request: Request): Promise<ObjectID> {
        return this.placeService.insert(request.body);
    }

    @Put('/:id')
    public async put(request: Request): Promise<Place> {
        let existing = await this.placeService.findOneById(request.params.id);
        if (!existing) {
            request.body._id = await this.post(request);
            return request.body;
        }
        return this.placeService.update(request.params.id, request.body);
    }

    @Delete('/:id')
    public delete(request: Request): Promise<any> {
        return this.placeService.remove(request.params.id);
    }
}
