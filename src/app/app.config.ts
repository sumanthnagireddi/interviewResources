import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { metaReducers, reducers } from './store/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { SidebarEffects } from './store/effects/sidebar.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideFirebaseApp(() => initializeApp({
      projectId: 'sumanthnagireddi-interview',
      appId: '1:690782833147:web:85e61606f3f76fe1b7a35e',
      storageBucket: 'sumanthnagireddi-interview.appspot.com',
      apiKey: 'AIzaSyC_y_0iJAjkfcgsSIawGrcIOIPvF19sxi4',
      authDomain: 'sumanthnagireddi-interview.firebaseapp.com',
      messagingSenderId: '690782833147',
      measurementId: 'G-S8V59ELZD2',
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStore(reducers, { metaReducers }),
    provideEffects(SidebarEffects),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(),autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true })
  ],
};
