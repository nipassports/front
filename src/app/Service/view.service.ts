import { Injectable } from '@angular/core';
import {View} from '../view';
@Injectable({
  providedIn: 'root'
})
export class ViewService {


  constructor(  private selectedvue : View) { }

  setView(vue: string) {
    this.selectedvue.view = vue;
  }
  getView() {
    return this.selectedvue.view;
  }
}

