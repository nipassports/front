import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-gouv',
  templateUrl: './accueil-gouv.component.html',
  styleUrls: ['./accueil-gouv.component.css']
})
export class AccueilGouvComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private entier = 0;

  mouseEnter(int: number) {
    this.entier = int;
  }

  mouseLeave(int: number) {
    this.entier = int

  }
}
