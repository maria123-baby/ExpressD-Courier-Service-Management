import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
import {ActivatedRoute, provideRouter } from '@angular/router';
import {firebaseConfig } from '../app/core/constants/constants'
import { routes } from './app.routes';

import { AngularFireModule } from '@angular/fire/compat';
import { getAuth, provideAuth} from '@angular/fire/auth';
import { getFirestore, provideFirestore} from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {  HttpClientModule, provideHttpClient } from '@angular/common/http';
/*import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';*/
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import {  AngularFireAuthModule } from '@angular/fire/compat/auth';
import {  AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserService } from './core/services/user.service';

NgModule({
  imports:[HttpClientModule],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig}
],
})
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
  
    importProvidersFrom([
     AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule,AngularFireDatabaseModule,
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
     provideDatabase(() => getDatabase()), 
  /*  provideFunctions(() => getFunctions()),
     provideMessaging(() => getMessaging())*/
    ]), provideAnimationsAsync(),
  ],
};