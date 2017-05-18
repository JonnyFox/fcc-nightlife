import { injectable } from 'inversify';

@injectable()
export class ConfigService {
    public env = process.env.NODE_ENV || 'development';
    public port = process.env.PORT || 8999;
    public db = {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nightlife-app'
    };
    public googleApi = {
        key: process.env.GOOGLE_API_KEY
    };
}