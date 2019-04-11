import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  isAuth = false;
  private citizenUrl = 'http://192.168.0.100:3000/citizen';
  private customUrl = 'http://192.168.0.100:3000/custom';
  private gouvUrl = 'http://192.168.0.100:3000/gouvernment';
  private passNb;

  constructor(private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: WebStorageService) { }


  verify(identifiant: string, passeword: string, type: string) {

    if (type === 'citizen') {
      const url = `${this.citizenUrl}/auth`;

      console.log("identification citoyen:" + identifiant + "," + passeword);

      return this.http.post<any>(url, { passNb: identifiant, password: passeword })
        .pipe(map(valid => {

          console.log('Connexion terminé ! validité des info: ' + valid.message);
          this.storage.set("view",'Mon Passeport')
          this.isAuth = true;
          return valid;
        }));

    }

    if (type === 'gouvernment') {
      const url = `${this.gouvUrl}/auth`;

      console.log("identification gouvernement:" + identifiant + "," + passeword);

      return this.http.post<any>(url, { identifiant: identifiant, password: passeword })
        .pipe(map(valid => {

          console.log('Connexion terminé ! validité des info: ' + valid.message);
          this.storage.set("view",'Espace Gouvernement')
          this.isAuth = true;
          return valid;
        }));
    }

    if(type === 'custom'){
      const url = `${this.customUrl}/auth`;

      console.log("identification douane:" + identifiant + "," + passeword);

      return this.http.post<any>(url, { identifiant: identifiant, password: passeword })
        .pipe(map(valid => {

          console.log('Connexion terminé ! validité des info: ' + valid.message);
          this.storage.set("view",'Liste des Passeports')
          this.isAuth = true;
          return valid;
        }));
    }
  }


  setPassNb(passNb: string) {

    console.log('recieved= passNb:' + 'value:' + passNb);
    this.storage.set("passNb", passNb);

  }

  getPassNb() {
    console.log('getPassNb:' + 'value:' + this.storage.get("passNb"));
    return this.storage.get("passNb");
  }

  getToken() {
    console.log('getPassNb:' + 'value:' + this.storage.get("token"));
    this.storage.get("token")
  }

  
  setToken(token: any) {
    console.log('setToken:' + 'value:' + token);
    this.storage.set("token", token);

  }

  setTbInfo(val: string) {
    this.storage.set("tbInfo", val);
  }

  getTbInfo(val: string) {
    return this.storage.get("tbInfo");
  }

}
