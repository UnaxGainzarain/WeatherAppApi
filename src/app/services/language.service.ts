import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private currentLangSubject = new BehaviorSubject<string>('es');
    currentLang$ = this.currentLangSubject.asObservable();

    constructor(private translate: TranslateService) {
        this.translate.setDefaultLang('es');
        this.translate.use('es');
    }

    setLanguage(lang: string) {
        this.translate.use(lang);
        this.currentLangSubject.next(lang);
    }

    getCurrentLanguage(): string {
        return this.translate.currentLang || 'es';
    }
}
