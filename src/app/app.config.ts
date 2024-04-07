import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
import { Routes, provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import {firebaseConfig } from '../app/core/constants/constants'
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { getAuth, provideAuth,AuthModule} from '@angular/fire/auth';
import { getFirestore, provideFirestore,FirestoreModule} from '@angular/fire/firestore';
import { getDatabase, provideDatabase , DatabaseModule} from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

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