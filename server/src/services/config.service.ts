import { injectable } from 'inversify';

@injectable()
export class ConfigService {
    public env = process.env.NODE_ENV || 'development';
    public port = process.env.PORT || 8999;
    public db = {
        uri: process.env.MONGODB_URI || 'mongodb://admin:admin@ds157320.mlab.com:57320/nightlife-app'
    };
    public googleApi = {
        key: process.env.GOOGLE_API_KEY || 'AIzaSyDXWAb18djD5erk0xOfjSF5b-aCG5NSmok'
    };
}