import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { GlobalToolbarInfo } from '../globalToolbarInfo';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Pass_json } from '../pass_json';
import { Pass } from '../pass';
import { Visa_json } from '../visa_json';
import {Visa} from '../visa';
@Injectable({
  providedIn: 'root'
})
export class PassService {

  private citizenUrl = 'http://192.168.0.100:3000/citizen';
  private customUrl = 'http://192.168.0.100:3000/custom';
  private gouvUrl = 'http://192.168.0.100:3000/gouvernment';
  private passNb: string;
  public data: any = [];

  constructor(private http: HttpClient, private global: GlobalToolbarInfo,
    @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  setPassNumb(passNb: string) {
    this.passNb = passNb;
  }
  getPassNumb() {
    return this.passNb;
  }
  

  //Citizen

  getPassInfo(passNb: string): Observable<Pass_json> {
    console.log('getPassInfo = token:' + 'value:' + this.storage.get("token"));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };

    const url = `${this.citizenUrl}/passport/`;
    return this.http.get<Pass_json>(url, options);
  }

  getVisa():Observable<Visa_json[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    const url = `${this.citizenUrl}/visa/`;
    return this.http.get<Visa_json[]>(url, options);
  }

  //Custom
  getPassInfoDouanes(passNb: string): Observable<Pass_json> {
    console.log('getPassInfo = token:' + 'value:' + this.storage.get("token"));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };

    const url = `${this.customUrl}/passport/${passNb}`;
    return this.http.get<Pass_json>(url, options);
  }

  getVisaDouane(passNb:string):Observable<Visa_json[]>{
    console.log('getPassInfo = token:' + 'value:' + this.storage.get("token"));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };

    const url = `${this.customUrl}/visa/${passNb}`;
    return this.http.get<Visa_json[]>(url, options);
  }

  getAllPass(): Observable<Pass_json[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };

    return this.http.get<Pass_json[]>(this.customUrl+"/passport", options);
  }

  // Government 
  /** POST: add a new Pass to the server */
  addPass(pseudoPass: any): Observable<any> {
    console.log('args: ' + pseudoPass);
    console.log('getPassInfo = token:' + 'value:' + this.storage.get("token"));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    console.log('VALEUR DE LIMAGE '+pseudoPass[17]);
    return this.http.post<any>(this.gouvUrl+"/passport",
      {
        type: pseudoPass[0],
        countryCode: pseudoPass[1],
        passNb: pseudoPass[2],
        name: pseudoPass[3],
        surname: pseudoPass[4],
        dateOfBirth: pseudoPass[5],
        nationality: pseudoPass[6],
        sex: pseudoPass[7],
        placeOfBirth: pseudoPass[8],
        height: pseudoPass[9].toString(),
        autority: pseudoPass[10],
        residence: pseudoPass[11],
        eyesColor: pseudoPass[12],
        dateOfExpiry: pseudoPass[13],
        dateOfIssue: pseudoPass[14],
        passOrigin: pseudoPass[15],
        validity: pseudoPass[16],
        image: pseudoPass[17]
      }, options);
  }

  getPassRandom(): Observable<Pass> {
    
    const url = `${this.gouvUrl}/random`;    
    return this.http.get<Pass>(url);
  }

  getCountryPass(countryCode:string): Observable<Pass_json[]> {

    const url = `${this.gouvUrl}/passport/all/${countryCode}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };

    return this.http.get<Pass_json[]>(url,options);
  }

  getPassInfoGouv(passNb: string): Observable<Pass_json> {
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };

    const url = `${this.gouvUrl}/passport/one/${passNb}`;
    return this.http.get<Pass_json>(url, options);
  }

  getAllPassGouv(countryCode:string):Observable<Pass_json[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };

    const url = `${this.gouvUrl}/passport/all/${countryCode}`;
    return this.http.get<Pass_json[]>(url, options);
  }

  getVisaGouv(passNb:string):Observable<Visa_json[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    const url = `${this.gouvUrl}/visa/one/${passNb}`;
    return this.http.get<Visa_json[]>(url, options);
  }
}
