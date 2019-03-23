import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from "@angular/router";
import { GlobalToolbarInfo } from '../globalToolbarInfo';


import { first } from 'rxjs/operators';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { PassService } from '../pass.service';


@Component({
  selector: 'app-authcitoyen',
  templateUrl: './authcitoyen.component.html',
  styleUrls: ['./authcitoyen.component.css']
})
export class AuthcitoyenComponent implements OnInit {

  loginForm: FormGroup;
  valid: boolean;
  submitted = false;
  error: any;

  constructor(private global: GlobalToolbarInfo, private auth: AuthentificationService, private service: PassService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      identifiant: ['', Validators.required],
      password: ['', Validators.required],
      checkbox: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.auth.verify(this.f.identifiant.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      ( data ) => {
        console.log('coucou');

        //console.log('connect: ' + data.message);

        if (data.message === 'Auth successful') {
          this.auth.setPassNb(this.f.identifiant.value);
          this.global.tbInfo = 'citoyen';
          // this.auth.setToolBar('citoyen');
          // this.global.token  = data.token;
          // this.global.passNb  = this.f.identifiant.value;
          this.auth.setToken(data.token);
          this.router.navigate(['/Mon Passeport/Mon Passeport']);
        }

        if (data.message==='Auth failed'){
          this.error = "Le mot de passe ou l'identifiant est incorrect";
        }

      },

      error => {
         this.error = error;
        // this.loading = false;
      });

  }

}
