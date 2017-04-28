import { Controller, Get, Post, Put, Delete } from 'inversify-express-utils';
import { injectable } from 'inversify';
import { Request } from '@types/express';
import { ObjectID } from "@types/mongodb";
import { Place } from '../models';
import { PlaceService } from '../services/place.service';

@injectable()
@Controller('/api/places')
export class PlaceController {

    constructor(private placeService: PlaceService) { }

    @Get('/')
    public async get(): Promise<Place[]> {
        return await this.placeService.findPlaces();
    }

    @Get('/:query')
    public async getPlaces(request: Request): Promise<Place[]> {
        return await this.placeService.findGooglePlaces(request.params.query);
    }

    @Post('/byIds')
    public getPlacesByIds(request: Request): Promise<Place[]> {
        let ids: string[] = request.body.ids;
        return this.placeService.findPlaces({ _id: { $in: ids } });
    }

    @Post('/')
    public async newPoll(request: Request): Promise<ObjectID> {
        return this.placeService.insert(request.body);
    }

    @Put('/:id')
    public async updatePoll(request: Request): Promise<Place> {
        return this.placeService.update(request.params.id, request.body);
    }

    @Delete('/:id')
    public deletePoll(request: Request): Promise<any> {
        return this.placeService.remove(request.params.id);
    }
}
