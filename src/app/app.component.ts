import { Component } from '@angular/core';
import { GlobalToolbarInfo } from './globalToolbarInfo';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject} from '@angular/core';
import { LyTheme2, ThemeVariables } from '@alyle/ui';

const STYLES = (theme: ThemeVariables) => ({
  '@global': {
    body: {
      backgroundColor: theme.background.default,
      color: theme.text.default,
      fontFamily: theme.typography.fontFamily,
      margin: 0,
      direction: theme.direction
    }
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly classes = this.theme.addStyleSheet(STYLES);

  title = 'nip-front';
  
  constructor(private theme: LyTheme2,
              private global: GlobalToolbarInfo,
              @Inject(SESSION_STORAGE) private storage: WebStorageService) {
  }

  ngOnInit(){
    console.log("toolbar: "+this.storage.get("tbInfo") )
    if ( this.storage.get("tbInfo") !== null ){
     this.global.tbInfo = this.storage.get("tbInfo");
    }
  }
}
