import { Component, OnInit } from '@angular/core';
import { PassService } from '../../Service/pass.service';
import { Problem } from '../../problem';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pass-issues',
  templateUrl: './pass-issues.component.html',
  styleUrls: ['./pass-issues.component.css']
})
export class PassIssuesComponent implements OnInit {

  problems: Problem[];


  constructor(private pS : PassService, private router: Router) { }

  ngOnInit() {
    this.getProblems(); 
  }

  getProblems() {
    this.pS.getProblems()
    .subscribe( 
      (problems) => {
          this.problems=problems; 
      },
      async (error) => {
        console.log(" modify pass info: ERROR: " + error.error.message);

        if(error.error.message === "Auth failed"){
          await Swal.fire({
            type: 'warning',
            title: "Votre session vient d'expirer !",
            confirmButtonColor: '#2F404D'
          })

          this.pS.clean();
          this.router.navigate(['/Se_connecter']);
        }
      }
    
      );

  }


  modifiedStatus(id : string): void {
    this.pS.modifiedPbStatus(id)
    .subscribe( 
      (message) => { 
        this.getProblems(); 
      },
      async (error) => {
        console.log(" modify pass info: ERROR: " + error.error.message);

        if(error.error.message === "Auth failed"){
          await Swal.fire({
            type: 'warning',
            title: "Votre session vient d'expirer !",
            confirmButtonColor: '#2F404D'
          })

          this.pS.clean();
          this.router.navigate(['/Se_connecter']);
        }
      }
    
      );
  }

}
