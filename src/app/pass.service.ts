import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pass } from './pass';
import { Pass_json } from './pass_json';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PassService {

  private passUrl = 'http://192.168.0.100:3000/passports';
  private passNb:string;

  constructor(private http: HttpClient) { }

  setPassNumb(passNb:string){
    this.passNb=passNb;
  }
  getPassNumb(){
    return this.passNb;
  }
  getPassInfo(passNb: string): Observable<Pass_json> {

    const url = `${this.passUrl}/${passNb}`;
    return this.http.get<Pass_json>(url)
  }

  getAllPass() :Observable<Pass_json[]>{
    return this.http.get<Pass_json[]>(this.passUrl)
  }

  /** POST: add a new hero to the server */
  addPass(pseudoPass: any): Observable<string> {
    console.log('args',pseudoPass[0],pseudoPass[1],pseudoPass[2],pseudoPass[3],pseudoPass[4],pseudoPass[5],pseudoPass[6],pseudoPass[7],pseudoPass[8],pseudoPass[9],pseudoPass[10],pseudoPass[11],pseudoPass[12],pseudoPass[13],pseudoPass[14],pseudoPass[15]);
    return this.http.post<string>('http://192.168.0.100:3000/passports',
    {
      type:pseudoPass[0],
      countryCode:pseudoPass[1],
      passNb:pseudoPass[2],
      name:pseudoPass[3],
      surname:pseudoPass[4],
      dateOfBirth:pseudoPass[5],
      nationality:pseudoPass[6],
      sex:pseudoPass[7],
      placeOfBirth:pseudoPass[8],
      height:pseudoPass[9].toString(),
      autority:pseudoPass[10],
      residence:pseudoPass[11],
      eyesColor:pseudoPass[12],
      dateOfExpiry:pseudoPass[13],
      dateOfIssue:pseudoPass[14],
      passOrigin:pseudoPass[15],
      validity:"Valide"
    });
  }


}
