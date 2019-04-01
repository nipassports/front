import { Injectable } from '@angular/core';

@Injectable()
export class GlobalToolbarInfo {
  tbInfo: string = 'all';
  token : string ;
  passNb : string;
  autority: number;
}