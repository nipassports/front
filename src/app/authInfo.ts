import { Injectable } from '@angular/core';

@Injectable()
export class AuthInfo {
    valid:boolean = false;
    passNb: string;
}