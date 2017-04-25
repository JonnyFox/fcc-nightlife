export class Settings {
    static default = {
        appName: 'voting-app',

        api: {
            backEndService: {
                host: 'http://localhost:8999',
                routes: {
                    users: 'api/users'
                }
            }
        },

        cookieStoreKeys: {
            accessToken: 'accessToken'
        }
    };
}
