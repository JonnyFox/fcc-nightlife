import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TokenService {
    public token: string;

    constructor(http: Http) { }
}
