import { Component, OnInit } from '@angular/core';
import {Visa} from '../../visa'
import{Visa_json} from '../../visa_json'
import { PassService } from '../../Service/pass.service';

@Component({
  selector: 'app-visagouv',
  templateUrl: './visagouv.component.html',
  styleUrls: ['./visagouv.component.css']
})
export class VisagouvComponent implements OnInit {

  visa_json:Visa_json[];
  private passNb: string;
  constructor(private pS : PassService) { }

  ngOnInit() {
    this.passNb = this.pS.getPassNumb();
    this.getVisa();
  }

  getVisa(): void {
    this.pS.getVisaGouv(this.passNb)
    .subscribe( visa_json => this.visa_json = visa_json);
    console.log(this.visa_json);
  }

}
