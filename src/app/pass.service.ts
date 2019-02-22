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

  getPassInfo (id:number): Observable<Pass> {
  
    const url = `${this.passUrl}/${id}`;
    return this.http.get<Pass>(url)
}
}
