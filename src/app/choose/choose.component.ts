import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {
  private entier=0;

  mouseEnter(int : number){
    this.entier=int;
 }

 mouseLeave(int:number){
   this.entier=int
   
 }
  constructor() { }

  ngOnInit() {
  }

}
