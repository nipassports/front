import { Inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private authUrl = 'http://192.168.0.100:3000/passports';
  private passNb;

  constructor(private http: HttpClient, 
    @Inject(SESSION_STORAGE) private storage: WebStorageService) { }


  verify(identifiant: string, passeword: string){
    const url = `${this.authUrl}/authcitizen`;

    console.log("identification :" + identifiant + "," + passeword);

    return this.http.post<any>(url, { passNb:identifiant, password:passeword })
      .pipe(map(valid => {
        // login successful if there's a user in the response
        console.log(valid);
        console.log('Connexion terminé ! validité des info: ' + valid.message);

        return valid;
      }));

  }


  logout() {
    
  }

  setPassNb(passNb:string){
 
    console.log('recieved= passNb:' + 'value:' + passNb);
    this.storage.set("passNb", passNb);

  }

  getPassNb(){
    console.log('getPassNb:' + 'value:' + this.storage.get("passNb"));
    return this.storage.get("passNb");
  }

  getTokenzz(){
    console.log('getPassNb:' + 'value:' + this.storage.get("token"));
    this.storage.get("token")
  }

  setToken(token:any){
    console.log('setToken:' + 'value:' + token);
    this.storage.set("token", token);

  }

  setTbInfo(val:string){
    this.storage.set("tbInfo", val);
  }

  getTbInfo(val:string) {
    return this.storage.get("tbInfo");
  }

}
