import { Injectable } from '@angular/core';

import { AuthApi } from './auth-api.class';
import { ApiBase, RequestLanguage } from './api-base.service';
import { ProjectApi } from './project-api.class';
import { UserApi } from './user-api.class';
import { AdminApi } from './admin-api.class';
import { SchemaApi } from './schema-api.class';
import { apiPost } from './api-methods';


@Injectable()
export class ApiService {
    public auth: AuthApi;
    public project: ProjectApi;
    public schema: SchemaApi;
    public user: UserApi;
    public admin: AdminApi;

    graphQL = apiPost('/{project}/graphql');

    constructor(protected apiBase: ApiBase) {
        this.auth = new AuthApi(apiBase);
        this.project = new ProjectApi(apiBase);
        this.user = new UserApi(apiBase);
        this.admin = new AdminApi(apiBase);
        this.schema = new SchemaApi(apiBase);
    }

    public setLanguageForServerMessages(language: RequestLanguage) {
        this.apiBase.setLanguageForServerMessages(language);
    }
}
