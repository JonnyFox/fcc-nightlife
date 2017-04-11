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
  public async getPolls(): Promise<Place[]> {
    return await this.placeService.find();
  }

  @Get('/:id')
  public async getPoll(request: Request): Promise<Place> {
    return await this.placeService.findOneById(request.params.id);
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
