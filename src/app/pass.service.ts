import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pass } from './pass';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  private passUrl = 'api/pass';

  constructor(
    private http: HttpClient) { }

  getPassInfo(id: number): Observable<Pass> {

    const url = `${this.passUrl}/${id}`;
    return this.http.get<Pass>(url)
  }

  /** POST: add a new hero to the server */
  addPass(pseudoPass: any): Observable<any> {
    return this.http.post('http://localhost:3000/passports',
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
      height:pseudoPass[9],
      autority:pseudoPass[10],
      residence:pseudoPass[11],
      eyesColor:pseudoPass[12],
      dateOfExpiry:pseudoPass[13],
      dateOfIssue:pseudoPass[14],
      passOrigin:pseudoPass[15],
      validity:'Valide'
    });
  }

}
