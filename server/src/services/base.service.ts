import { ObjectID, Collection, DeleteWriteOpResultObject } from 'mongodb';
import { injectable } from 'inversify';
import { DbService, Collections } from './db.service';

export { InsertOneWriteOpResult, UpdateWriteOpResult, DeleteWriteOpResultObject } from 'mongodb';

@injectable()
export abstract class BaseService<T> {
  protected collectionType: Collections;

  private get collection(): Promise<Collection> {
    return this.dbService.getCollection(this.collectionType);
  };

  constructor(protected dbService: DbService) { }

  public async find(filter?: Object): Promise<T[]> {
    let collection = await this.dbService.getCollection(this.collectionType);
    return collection.find(filter).toArray();
  }

  public async findOneById(objectId: string): Promise<T> {
    let collection = await this.dbService.getCollection(this.collectionType);
    let items = await collection.find({ _id: new ObjectID(objectId) }).limit(1).toArray();
    return items[0];
  }

  public async insert(entity: T): Promise<ObjectID> {
    let collection = await this.dbService.getCollection(this.collectionType);
    let result = await collection.insertOne(entity);
    return result.insertedId;
  }

  public async update(objectId: string, entity: T): Promise<T> {
    let collection = await this.dbService.getCollection(this.collectionType);
    delete (<any>entity)._id;
    await collection.updateOne({ _id: new ObjectID(objectId) }, entity);
    return this.findOneById(objectId);
  }

  public async remove(objectId: string): Promise<DeleteWriteOpResultObject> {
    let collection = await this.dbService.getCollection(this.collectionType);
    return collection.deleteOne({ _id: new ObjectID(objectId) });
  }
}
