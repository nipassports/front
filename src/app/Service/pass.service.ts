import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { GlobalToolbarInfo } from '../globalToolbarInfo';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Pass_json } from '../pass_json';
import { Pass } from '../pass';

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

  getPassRandom(): Observable<Pass> {
    
    const url = `${this.gouvUrl}/random`;
    this.http.get<Pass>(url)
    .subscribe(
      data => {console.log("passRandom: "+JSON.stringify(data) )}
    )
    
    return this.http.get<Pass>(url);
  }

  getPassInfo(passNb: string): Observable<Pass_json> {
    console.log('getPassInfo = token:' + 'value:' + this.storage.get("token"));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };

    const url = `${this.citizenUrl}/${passNb}`;
    return this.http.get<Pass_json>(url, options);
  }

  getPassInfoDouanes(passNb: string): Observable<Pass_json> {
    console.log('getPassInfo = token:' + 'value:' + this.storage.get("token"));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };

    const url = `${this.customUrl}/${passNb}`;
    return this.http.get<Pass_json>(url, options);
  }

  getAllPass(): Observable<Pass_json[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };

    return this.http.get<Pass_json[]>(this.customUrl, options);
  }

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
    return this.http.post<any>(this.gouvUrl,
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


}
