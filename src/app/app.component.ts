import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'schedule-tool';
  selectedLanguage = { value: 'en', text: 'English' };
  languageList: any[];

  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(this.selectedLanguage.value);

    //options to select language
    this.languageList = [{ value: 'en', text: 'English' }, { value: 'hi', text: 'Hindi' }]
  }

  /**
   * Method to be called when language option is selected.
   */
  languageChange() {
    this.translate.use(this.selectedLanguage.value);
    this.translate.get(['ENGLISH', 'HINDI']).subscribe(response => {
      this.languageList = [{ value: 'en', text: response.ENGLISH }, { value: 'hi', text: response.HINDI }]
    })
  }
}
