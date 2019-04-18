import { Component, OnInit } from '@angular/core';
import { PassService } from '../../Service/pass.service';
import { Problem } from '../../problem';


@Component({
  selector: 'app-pass-issues',
  templateUrl: './pass-issues.component.html',
  styleUrls: ['./pass-issues.component.css']
})
export class PassIssuesComponent implements OnInit {

  private nbproblem : number; 
  problems: Problem[];

  constructor(private pS : PassService) { }

  ngOnInit() {
    this.getProblems(); 
  }

  getProblems() {
    this.pS.getProblems(this.pS.getCountryCode())
    .subscribe( 
      (problems) => {
          this.problems=problems; 
          console.log(problems); 
      });

  }

}
