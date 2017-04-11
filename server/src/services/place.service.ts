import { injectable } from 'inversify';
import { DbService, Collections } from './db.service';
import { Place } from '../models';
import { BaseService } from './base.service';

@injectable()
export class PlaceService extends BaseService<Place>  {
    constructor(protected dbService: DbService) {
        super(dbService);
        this.collectionType = Collections.Polls;
    }
}
