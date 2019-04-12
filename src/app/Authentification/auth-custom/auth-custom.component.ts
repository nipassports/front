import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { first } from 'rxjs/operators';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';


import { AuthentificationService } from '../../Service/authentification.service';
import { GlobalToolbarInfo } from '../../globalToolbarInfo';
import { PassService } from '../../Service/pass.service';




@Component({
  selector: 'app-auth-custom',
  templateUrl: './auth-custom.component.html',
  styleUrls: ['./auth-custom.component.css']
})
export class AuthCustomComponent implements OnInit {

  loginForm: FormGroup;
  
  private submitted = false;
  private error: any;
  private type = 'custom';

  constructor(private global: GlobalToolbarInfo, private auth: AuthentificationService, private service: PassService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      identifiant: ['', Validators.required],
      password: ['', Validators.required],
      //checkbox: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.auth.verify(this.f.identifiant.value, this.f.password.value,this.type)
    .pipe(first())
    .subscribe(
      ( data ) => {
        console.log('coucou: '+JSON.stringify(data));

        //console.log('connect: ' + data.message);

        if (data.message === 'Auth successful') {
          this.auth.setPassNb(this.f.identifiant.value);
          this.global.tbInfo = 'douanes';
          this.auth.setTbInfo('douanes');
          // this.global.token  = data.token;
          // this.global.passNb  = this.f.identifiant.value;
          this.auth.setToken(data.token);
          this.router.navigate(['Espace Douanes/Liste des Passeports']);
        }

      },

      error => {
        console.log('ERROR: '+ JSON.stringify(error));
         //this.error = JSON.stringify(error);
         this.error = "Le mot de passe ou l'identifiant est incorrect";
        // this.loading = false;
      });

  }

}
