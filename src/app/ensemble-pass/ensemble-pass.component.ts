import { Component, OnInit } from '@angular/core';
import { PassService } from '../pass.service';
import { Pass } from '../pass';
import { Pass_json } from '../pass_json';


@Component({
  selector: 'app-ensemble-pass',
  templateUrl: './ensemble-pass.component.html',
  styleUrls: ['./ensemble-pass.component.css']
})
export class EnsemblePassComponent implements OnInit {

  Allpass:Pass_json[];
  constructor(private pS : PassService) { }
  fakeArray = new Array(16);
  ngOnInit() {
    this.getAllPass();
  }

  getAllPass(): void {
    this.pS.getAllPass()
    .subscribe( Allpass => this.Allpass = Allpass);
    console.log(this.Allpass);
  }

}
