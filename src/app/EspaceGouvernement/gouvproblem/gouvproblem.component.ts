import { Component, OnInit } from '@angular/core';
import { PassService } from '../../Service/pass.service';
import { Problem } from '../../problem';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../../Service/authentification.service';

@Component({
  selector: 'app-gouvproblem',
  templateUrl: '../../EspaceCitoyen/autre/autre.component.html',
  styleUrls: ['../../EspaceCitoyen/autre/autre.component.css']
})
export class GouvproblemComponent implements OnInit {

  private problems : Problem[]; 

  constructor(private pS : PassService, private router: Router) { }

  ngOnInit() {
    this.getProblems(); 

  }


  getProblems() {
    this.pS.getProblemsByPass(this.pS.getPassNumb())
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

}
