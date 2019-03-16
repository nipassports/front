import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from "@angular/router";
import { GlobalToolbarInfo } from '../globalToolbarInfo';
import { AuthInfo } from '../authInfo';

import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';


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

  constructor(private global: GlobalToolbarInfo, private auth: AuthentificationService, 
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
      (data: boolean) => {
        
        console.log("connect: " + data)

        if (data == true) {
          this.auth.setPassNb(this.f.identifiant.value);
          this.global.tbInfo = 'citoyen';
          this.router.navigate(['/Mon Passeport/Mon Passeport']);
        }

        if (data==false){
          this.error = "Le mot de passe ou l'identifiant est incorrect";
        }

      },

      error => {
         this.error = error;
        // this.loading = false;
      });

  }

}
