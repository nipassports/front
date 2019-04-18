import { Component } from '@angular/core';
import { GlobalToolbarInfo } from './globalToolbarInfo';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject} from '@angular/core';
import { ViewService } from './Service/view.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nip-front';
  
  constructor(private global: GlobalToolbarInfo, @Inject(SESSION_STORAGE) private storage: WebStorageService, private viewService: ViewService ) {
  }

  ngOnInit(){
    console.log("toolbar: "+this.storage.get("tbInfo") )
    if ( this.storage.get("tbInfo") !== null ){
     this.global.tbInfo = this.storage.get("tbInfo");
    }
  }
}
