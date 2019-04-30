import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalToolbarInfo } from '../globalToolbarInfo';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { PassService } from '../Service/pass.service';
import Swal from 'sweetalert2';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-signaler-probleme',
  templateUrl: './signaler-probleme.component.html',
  styleUrls: ['./signaler-probleme.component.css']
})
export class SignalerProblemeComponent implements OnInit {
  email: string;
  probleme_type: string;
  titreForm: string;
  description: string;

  submitted = false;
  form: FormGroup;

  get f() { return this.form.controls; }

  constructor(private global: GlobalToolbarInfo, private router: Router, private formBuilder: FormBuilder, private ps: PassService) { }

  ngOnInit() {
    
    this.form = new FormGroup({
      emailForm: new FormControl(null, [Validators.required, Validators.email]),
      probleme_typeForm: new FormControl(null, Validators.required),
      titreForm: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      descriptionForm: new FormControl(null, [Validators.required, Validators.maxLength(500)])
    });


  }
  async onSubmit() {
    this.submitted = true;
    console.log(this.form);

    if (this.form.invalid) {
      return;
    }

    const probleme = [
      this.form.controls.emailForm.value,
      this.form.controls.probleme_typeForm.value,
      this.form.controls.titreForm.value,
      this.form.controls.descriptionForm.value
    ]
    console.log("probleme: " + probleme);
    console.log("passNb : "+this.ps.getPassNumb());

     this.ps.sendProblem(probleme, this.global.tbInfo, this.ps.getPassNumb())
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.message == 'Problem sent') {
            console.log('DATA.MESSAGE: ' + JSON.stringify(data.message));
            Swal.fire({
              title: 'Probleme signalé !',
              type: 'success',
              confirmButtonText: 'Fermer', 
              confirmButtonColor: '#2F404D',
              timer : 6000
            }) 
            this.form.reset();
            this.submitted = false;
          }
        },
        async (error) => {
          console.log(" PROBLEME: ERROR: " + error.error.message);

            if(error.error.message === "Auth failed"){
              await Swal.fire({
                type: 'warning',
                title: "Votre session vient d'expirer !",
                confirmButtonColor: '#2F404D'
              })

              this.ps.clean();
              this.router.navigate(['/Se_connecter']);
            }
            else{
              Swal.fire({
                type: 'warning',
                title: "Une erreur est survenue !",
                text: "Veuillez ré-essayer ultérieurement.",
                confirmButtonColor: '#2F404D',
              })
            }
        }
      )
  }


  }