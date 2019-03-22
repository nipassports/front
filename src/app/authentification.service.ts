import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthInfo } from './authInfo';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private authUrl = 'http://192.168.0.100:3000/passports';
  private passNb;

  constructor(private http: HttpClient, private info: AuthInfo) { }


  verify(identifiant: string, passeword: string){
    const url = `${this.authUrl}/authcitizen`;

    this.info.passNb = identifiant;
    console.log("identification :" + identifiant + "," + passeword);

    return this.http.post<any>(url, { passNb:identifiant, password:passeword })
      .pipe(map(valid => {
        // login successful if there's a user in the response
        this.info.valid = valid;
        console.log(valid);
        console.log('Connexion terminé ! validité des info: ' + valid.message);

        return valid;
      }));

  }


  getValidity(): boolean {
    console.log("auth service: " + this.info.valid)
    return this.info.valid;
  }


  logout() {
    this.info.valid = false;
    this.info.passNb = '';
  }

  getPassNb(): string {
    return this.passNb;
  }

  setPassNb(passNb: string) {
    this.passNb = passNb;
  }
}
