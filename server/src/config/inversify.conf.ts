import 'reflect-metadata';
import { Container } from 'inversify';
import { interfaces, Controller, TYPE } from 'inversify-express-utils';
import { ConfigService, DbService, PlaceService } from '../services';
import { PlaceController } from '../controllers';

let container = new Container();
container.bind<ConfigService>(ConfigService).toSelf().inSingletonScope();
container.bind<DbService>(DbService).toSelf();
container.bind<PlaceService>(PlaceService).toSelf();
container.bind<interfaces.Controller>(TYPE.Controller).to(PlaceController).whenTargetNamed('PlaceController');
export default container;
