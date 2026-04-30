import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { provideFirebaseApp,  } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),provideFirebaseApp(()=>initializeApp(environment.firebase)),
  provideFirestore(()=>getFirestore())]
};
