import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { GlobalToolbarInfo } from '../globalToolbarInfo';
import { SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Pass_json } from '../pass_json';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  private citizenUrl = 'http://192.168.0.100:3000/citizen';
  private customUrl = 'http://192.168.0.100:3000/custom';
  private gouvUrl = 'http://192.168.0.100:3000/gouvernment';
  private passNb:string;
  public data:any=[];

  constructor(private http: HttpClient , private global: GlobalToolbarInfo,
    @Inject(SESSION_STORAGE) private storage: WebStorageService) { }



  getPassInfo(passNb: string): Observable<Pass_json> {
    console.log('getPassInfo = token:' + 'value:' + this.storage.get("token"));
    const headers = new HttpHeaders({'Content-Type'  : 'application/json',
                                 Authorization : 'bearer ' + this.storage.get("token")
                                });
    const options = { headers: headers };

    const url = `${this.citizenUrl}/${passNb}`;
    return this.http.get<Pass_json>(url , options);
  }

  getAllPass() :Observable<Pass_json[]>{

    return this.http.get<Pass_json[]>(this.customUrl)
  }

  /** POST: add a new Pass to the server */
  addPass(pseudoPass: any): Observable<string> {
    console.log('args',pseudoPass[0],pseudoPass[1],pseudoPass[2],pseudoPass[3],pseudoPass[4],pseudoPass[5],pseudoPass[6],pseudoPass[7],pseudoPass[8],pseudoPass[9],pseudoPass[10],pseudoPass[11],pseudoPass[12],pseudoPass[13],pseudoPass[14],pseudoPass[15]);
    return this.http.post<string>(this.gouvUrl,
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
