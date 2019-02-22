import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Pass } from './pass';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const pass = [

      { type: 'P',
      countryCode: 'FR',
      passNb: '14ML52147', 
      name: 'Brice',
      surname: 'NICE',     
      dateOfBirth: '10/05/1995',
      nationality: 'France',
      sex: 'M',
      placeOfBirth: 'Toulouse',
      height: 1.69,
      autority: 'Préfecture de Haute Garonne TOULOUSE',
      residence: 'Avenues de Scientifiques, 33400 Talence',
      eyesColor: 'MARRON',
      dateOfExpiry: '16/02/2023',
      dateOfIssue: '25/01/2015',
      passOrigin:'France',
      validity: 'Valide',
      id: 1
     },

     { type: 'P',
     countryCode: 'FR',
     passNb: '14ML52147', 
     name: 'Toto',
     surname: 'DUBEUIL',    
     dateOfBirth: '10/05/1995',
     nationality: 'France',
     sex: 'M',
     placeOfBirth: 'Paris',
     height: 1.69,
     autority: 'Préfecture de Haute Garonne TOULOUSE',
     residence: 'Avenues de Scientifiques, 33400 Talence',
     eyesColor: 'MARRON',
     dateOfExpiry: '16/02/2023',
     dateOfIssue: '25/01/2015',
     passOrigin:'France',
     validity: 'Invalide',
     id: 2
    },
    ];
    return {pass};
  }
}