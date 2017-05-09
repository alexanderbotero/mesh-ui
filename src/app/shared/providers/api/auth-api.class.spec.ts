import { AuthApi } from './auth-api.class';
import { MockApiBase } from './api-base.mock';
import { Observable } from 'rxjs/Observable';


describe('AuthApi', () => {
    let authApi: AuthApi;
    let apiBase: MockApiBase;

    beforeEach(() => {
        apiBase = new MockApiBase();
        authApi = new AuthApi(apiBase);
    });

    describe('login', () => {

        it('sends a POST request to /auth/login', () => {
            authApi.login({ username: 'McKittrick', password: '7KQ201' });
            expect(apiBase.allRequests.length).toBe(1);
            expect(apiBase.lastRequest.method).toBe('POST');
            expect(apiBase.lastRequest.url).toBe('/auth/login');
            expect(apiBase.lastRequest.body).toEqual({
                username: 'McKittrick',
                password: '7KQ201'
            });
        });

        it('emits "true" when the request succeeds', () => {
            let result: any;
            authApi.login({ username: 'exampleuser', password: 'rosebud' })
                .subscribe(r => { result = r; });
            expect(apiBase.lastRequest).toBeDefined();
            apiBase.lastRequest.respond(200, { token: 'very long session token' });
            expect(result).toBe(true);
        });

        it('emits "false" when the request returns a 401', () => {
            let result: any;
            authApi.login({ username: 'exampleuser', password: 'rosebud' })
                .subscribe(r => { result = r; });
            expect(apiBase.lastRequest).toBeDefined();
            apiBase.lastRequest.respond(401, {
                properties: {},
                type: 'generic_error',
                message: 'Login failed.'
            });
            expect(result).toBe(false);
        });

        it('throws on unexpected HTTP errors', () => {
            let emittedError = false;
            authApi.login({ username: 'exampleuser', password: 'rosebud' })
                .catch(() => {
                    emittedError = true;
                    return Observable.never();
                })
                .subscribe();
            expect(apiBase.lastRequest).toBeDefined();
            apiBase.lastRequest.respond(500, 'Internal Server Error');
            expect(emittedError).toBe(true);
        });

    });

});
