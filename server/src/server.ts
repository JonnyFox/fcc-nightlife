import 'reflect-metadata';
import * as logger from 'morgan';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import container from './config/inversify.conf';
import { ConfigService } from './services';
import { InversifyExpressServer } from 'inversify-express-utils';

let configService = container.get(ConfigService);
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use('/lib', express.static(path.join(__dirname, '../../node_modules')));
  app.use('/app', express.static(path.join(__dirname, '../public/app')));
  app.use(logger('dev'));
});

let app = server.build().listen(configService.port);
console.log(`Server started on port ${configService.port} :)`);

exports = module.exports = app;
