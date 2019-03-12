import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthInfo } from './authInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private authUrl = 'http://192.168.0.100:3000/';
  private id: number;
  constructor( private http: HttpClient ) { }

  verify(identifiant:string,passeword:string): AuthInfo{
    const url = `${this.authUrl}/?identifiant=${identifiant}&password=${passeword}`;
    //info = this.http.get<AuthInfo>(url)
    let info = {
      id: 1,
    }

    this.id = info.id;
    return info;
  }

  getId(): Observable<number>{
    return of(this.id);
  }
}
