import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
import { Routes, provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import {firebaseConfig } from '../app/core/constants/constants'
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
<<<<<<< HEAD

=======
import { AngularFireModule } from '@angular/fire/compat';
>>>>>>> 79c2a90a4eb9af1f66b697caa03ea4a27f9cf4b3
import { getAuth, provideAuth,AuthModule} from '@angular/fire/auth';
import { getFirestore, provideFirestore,FirestoreModule} from '@angular/fire/firestore';
import { getDatabase, provideDatabase , DatabaseModule} from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';



NgModule({
  imports:[]
})
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes,withViewTransitions(),withComponentInputBinding()),
  
    importProvidersFrom([
     AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule,AngularFireDatabaseModule,
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
     provideDatabase(() => getDatabase()), 
    provideFunctions(() => getFunctions()),
     provideMessaging(() => getMessaging())
    ]),
  ],
};
=======

NgModule({
  imports:[FormsModule]
})
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(),withComponentInputBinding()),provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage())
    ]),
  ],
};
>>>>>>> 79c2a90a4eb9af1f66b697caa03ea4a27f9cf4b3
