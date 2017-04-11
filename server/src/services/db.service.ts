import { Db, MongoClient, Collection } from 'mongodb';
import { injectable } from 'inversify';
import { ConfigService } from './config.service';

export enum Collections {
    Users,
    Votes,
    Polls
}

@injectable()
export class DbService {

    private db: Db;

    constructor(private configService: ConfigService) { }

    public async getCollection(collection: Collections): Promise<Collection> {
        if (!this.db) {
            this.db = await this.init();
        }
        return this.db.collection(Collections[collection]);
    }

    public init(): Promise<Db> {
        try {
            return MongoClient.connect(this.configService.db.uri);
        } catch (err) {
            console.error(err);
            process.exit(-1);
        }
    }
}