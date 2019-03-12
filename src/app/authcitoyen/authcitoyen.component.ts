import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';
import { AuthInfo } from '../authInfo';
import {Router} from "@angular/router";


@Component({
  selector: 'app-authcitoyen',
  templateUrl: './authcitoyen.component.html',
  styleUrls: ['./authcitoyen.component.css']
})
export class AuthcitoyenComponent implements OnInit {

  private info: AuthInfo;
  valid: boolean;

  constructor(private auth: AuthentificationService, private router: Router) { }

  ngOnInit() {
  }

  connect(identifiant:string,password:string){
    this.info = this.auth.verify(identifiant,password);
    if (this.info.id != -1){
      this.valid = true;
    }

    console.log(this.valid);
    if(this.valid==true){
      this.router.navigate(['//Mon Passeport/Mon Passeport']);
    }
  }
}
