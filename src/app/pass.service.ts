import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pass } from './pass';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  private passUrl = 'http://192.168.0.100:3000/passports';

  constructor(
    private http: HttpClient) { }

  getPassInfo(id: number): Observable<Pass> {

    const url = `${this.passUrl}/${id}`;
    return this.http.get<Pass>(url)
  }

  /** POST: add a new hero to the server */
  addPass(pseudoPass: any): Observable<any> {
    return this.http.post('http://192.168.0.100:3000/passports',
    {
      Type:pseudoPass[0],
      CountryCode:pseudoPass[1],
      PassNb:pseudoPass[2],
      Name:pseudoPass[3],
      Surname:pseudoPass[4],
      DateOfBirth:pseudoPass[5],
      Nationality:pseudoPass[6],
      Sex:pseudoPass[7],
      PlaceOfBirth:pseudoPass[8],
      Height:pseudoPass[9],
      Autority:pseudoPass[10],
      Residence:pseudoPass[11],
      EyesColor:pseudoPass[12],
      DateOfExpiry:pseudoPass[13],
      DateOfIssue:pseudoPass[14],
      PassOrigin:pseudoPass[15],
      Validity:'Valide'
    });
  }

}
