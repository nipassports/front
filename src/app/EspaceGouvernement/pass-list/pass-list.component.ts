import { Component, OnInit } from '@angular/core';
import { Pass_json } from '../../pass_json';
import { PassService } from '../../Service/pass.service';

@Component({
  selector: 'app-pass-list',
  templateUrl: './pass-list.component.html',
  styleUrls: ['./pass-list.component.css']
})

export class PassListComponent implements OnInit {

  Allpass:Pass_json[];
  fakeArray = new Array(16);

  constructor(private pS : PassService) { }
  

  ngOnInit() {
    this.getAllPassGouv("FR");
  }

  getAllPassGouv(country: string): void {
    this.pS.getAllPassGouv(country)
    .subscribe( Allpass => this.Allpass = Allpass);
    console.log(this.Allpass);
  }


}
