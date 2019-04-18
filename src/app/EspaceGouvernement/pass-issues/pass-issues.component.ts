import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pass-issues',
  templateUrl: './pass-issues.component.html',
  styleUrls: ['./pass-issues.component.css']
})
export class PassIssuesComponent implements OnInit {

  private nbproblem : number; 
  problems: number[] = [1, 2, 3];

  constructor() { }

  ngOnInit() {
  }

}
