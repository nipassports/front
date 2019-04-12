import { Component, OnInit } from '@angular/core';
import {Visa} from '../../visa'
import{Visa_json} from '../../visa_json'
import { PassService } from '../../Service/pass.service';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.css']
})
export class VisaComponent implements OnInit {
  visa_json:Visa_json[];
  
  constructor(private pS : PassService) { }

  ngOnInit() {
    this.getVisa();
  }

  getVisa(): void {
    this.pS.getVisa()
    .subscribe( visa_json => this.visa_json = visa_json);
    console.log(this.visa_json);
  }

}
