import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, observable, from } from 'rxjs';
import { GlobalToolbarInfo } from '../globalToolbarInfo';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Pass_json } from '../pass_json';
import { Pass } from '../pass';
import { Visa_json } from '../visa_json';
import { Visa } from '../visa';
import { Problem } from "../problem";
import { Password } from "../password";
import { ResponseQueueJson } from "../ResponseQueueJson";
import { delay } from 'q';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PassService {
  private citizenUrl = 'https://nip.ddns.net:3000/citizen';
  private customUrl = 'https://nip.ddns.net:3000/custom';
  private gouvUrl = 'https://nip.ddns.net:3000/government';
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

  setCountryCode(val: string) {
    this.storage.set("countryCode", val);
  }

  getCountryCode() {
    return this.storage.get("countryCode");
  }

  async getResponseFromHttpRequestWithQueue(id: number) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    var ok: boolean = false;
    const options = { headers: headers };
    var data: any;


    console.log("true ID: " + id)
    const url = `${this.gouvUrl}/passport/result/${id}`;

    let observable = this.http.get<ResponseQueueJson[]>(url, options); //requête faite au serveur

    let observer = { // ce qui nous permet d'observer la réponse de la requête
      next: status => {

        console.log("reponse queue avant if: " + JSON.stringify(status))
        if (status.processingResults === "Transaction has been submitted") {
          console.log("YESSSSSSSS: " + JSON.stringify(status))
          ok = true;
          data = status;
        }
      },

      error: err => { }
    }


    while (ok === false) { //Répétition de la requête toutes les 2 secondes

      await observable.subscribe(status => observer.next(status));
      await delay(2000);

    }


    return data;

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

  getVisa(): Observable<Visa_json[]> {
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

  getVisaDouane(passNb: string): Observable<Visa_json[]> {
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

    return this.http.get<Pass_json[]>(this.customUrl + "/passport", options);
  }

  // Government 
  /** POST: add a new Pass to the server */

  addPass(pseudoPass: any): Observable<any> {
    console.log('args: ' + pseudoPass);

   // console.log('getPassInfo = token:' + 'value:' + this.storage.get("token"));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
   // console.log('VALEUR DE LIMAGE ' + pseudoPass[17]);

    return this.http.post<any>(this.gouvUrl + "/passport",
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

  modifyPass(pseudoPass: any) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    return this.http.put<any>(this.gouvUrl + "/passport/update",
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

    const url = `${this.gouvUrl}/passport/random`;
    return this.http.get<Pass>(url);
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

  getAllPassGouv(): Observable<Pass_json[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };

    const url = `${this.gouvUrl}/passport/all`;
    return this.http.get<Pass_json[]>(url, options);
  }




  // Visa
  addVisa(visaInfo: any): Observable<any> {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });

    console.log("pS: " + visaInfo[0]);
    const options = { headers: headers };

    return this.http.post<any>(this.gouvUrl + "/visa",
      {
        type: visaInfo[0],
        visaCode: visaInfo[1],
        passNb: visaInfo[2],
        name: visaInfo[3],
        surname: visaInfo[4],
        autority: visaInfo[5],
        dateOfExpiry: visaInfo[6].toString(),
        dateOfIssue: visaInfo[7].toString(),
        placeOfIssue: visaInfo[8],
        validity: visaInfo[9],
        validFor: visaInfo[10],
        numberOfEntries: visaInfo[11],
        durationOfStay: visaInfo[12].toString(),
        remarks: visaInfo[13]
      }, options);

  }

  getVisaGouv(passNb: string): Observable<Visa_json[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    const url = `${this.gouvUrl}/visa/one/${passNb}`;
    return this.http.get<Visa_json[]>(url, options);
  }
  //Search

  govSearch(pseudoPass: any): Observable<Pass_json[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    const url = `${this.gouvUrl}/passport/search`;
    let trueSearch = {};

    const search = {
      type: pseudoPass[0],
      autority: pseudoPass[1],
      passNb: pseudoPass[2],
      name: pseudoPass[3],
      surname: pseudoPass[4],
      dateOfBirth: pseudoPass[5],
      nationality: pseudoPass[6],
      sex: pseudoPass[7],
      placeOfBirth: pseudoPass[8],
      height: pseudoPass[9].toString(),
      residence: pseudoPass[10],
      eyesColor: pseudoPass[11],
      dateOfExpiry: pseudoPass[12],
      dateOfIssue: pseudoPass[13],
      passOrigin: pseudoPass[14],
      validity: pseudoPass[15]
    }


    for (let key in search) {
      let value = search[key];
      console.log("key: " + key + " value: " + value);
      if (value !== "") {
        trueSearch[key] = value;

      }


    }

    console.log("trueSearch: " + JSON.stringify(trueSearch))

    return this.http.post<Pass_json[]>(url, trueSearch, options);
  }

  customSearch(pseudoPass: any): Observable<Pass_json[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    const url = `${this.customUrl}/passport/search`;
    let trueSearch = {};

    const search = {
      type: pseudoPass[0],
      autority: pseudoPass[1],
      passNb: pseudoPass[2],
      name: pseudoPass[3],
      surname: pseudoPass[4],
      dateOfBirth: pseudoPass[5],
      nationality: pseudoPass[6],
      sex: pseudoPass[7],
      placeOfBirth: pseudoPass[8],
      height: pseudoPass[9].toString(),
      residence: pseudoPass[10],
      eyesColor: pseudoPass[11],
      dateOfExpiry: pseudoPass[12],
      dateOfIssue: pseudoPass[13],
      passOrigin: pseudoPass[14],
      validity: pseudoPass[15]
    }


    for (let key in search) {
      let value = search[key];
      console.log("key: " + key + " value: " + value);
      if (value !== "") {
        trueSearch[key] = value;

      }


    }

    console.log("trueSearch: " + JSON.stringify(trueSearch))

    return this.http.post<Pass_json[]>(url, trueSearch, options);
  }


  getNewPassword(passNb: string): Observable<Password> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    const url = `${this.gouvUrl}/passport/newPassword/${passNb}`;
    return this.http.get<Password>(url, options);
  }

  //Problem
  getProblems(): Observable<Problem[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    const url = `${this.gouvUrl}/problems/all`;
    return this.http.get<Problem[]>(url, options);
  }

  getProblemsByPassNb(): Observable<Problem[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    const url = `${this.citizenUrl}/problems`;
    return this.http.get<Problem[]>(url, options);
  }

  getProblemsByPass(passNb: string): Observable<Problem[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    const url = `${this.gouvUrl}/problems/${passNb}`;
    return this.http.get<Problem[]>(url, options);
  }

  getProblemsByPassCustom(passNb: string): Observable<Problem[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    const url = `${this.customUrl}/problems/${passNb}`;
    return this.http.get<Problem[]>(url, options);
  }


  modifiedPbStatus(id: string): Observable<JSON> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    const url = `${this.gouvUrl}/problems/${id}`;
    return this.http.post<any>(url, [], options);
  }

  sendProblem(problemeInfo: any, typeUser: string, passNb: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });

    const options = { headers: headers };

    console.log("FONCTION SEND PROBLEM", problemeInfo, typeUser);

    if (typeUser == 'citoyen') {
      const url = `${this.citizenUrl}/problem/`;
      return this.http.post<any>(url, {
        email: problemeInfo[0],
        type: problemeInfo[1],
        title: problemeInfo[2],
        message: problemeInfo[3]
      }, options);
    } else if (typeUser == 'douanes') {
      const url = `${this.customUrl}/problem/`;
      var countryCode: string;
      this.getPassInfoDouanes(passNb)
        .subscribe(
          data => { countryCode = data.infos.countryCode },
        )
      return this.http.post<any>(url, {
        passNb: passNb,
        email: problemeInfo[0],
        type: problemeInfo[1],
        title: problemeInfo[2],
        message: problemeInfo[3],
        countryCode: countryCode
      }, options);
    }


  }


  //Session
  clean() {
    this.global.tbInfo = 'all';
    this.storage.remove("tbInfo");
    this.storage.remove("token");
    this.storage.set("view", 'Accueil');
    this.storage.remove("autority");
    this.storage.remove("passInfo");
  }

  SwapValidityGouv(passNb: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.storage.get("token")
    });
    const options = { headers: headers };
    const url = `${this.gouvUrl}/passport/valid/${passNb}`;
    return this.http.get<any>(url, options);
  }
}
