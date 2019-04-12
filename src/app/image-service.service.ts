import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  IMGbase64:string;
  constructor() { }


  loadImage(src:string){
    this.IMGbase64=src;
    console.log(this.IMGbase64);
  }
}
