import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { SidebarEffects } from './store/effects/sidebar.effects';
import { reducers, metaReducers } from './store/reducers';
import { TechnologyEffects } from './store/effects/technology.effects';
import { ContentEffects } from './store/effects/content.effects';
import { TopicEffects } from './store/effects/topic.effects';
import { BlogEffects } from './store/effects/blog.effects';
import { StarredEffects } from './store/effects/starred.effects';
import { provideServiceWorker } from '@angular/service-worker';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStore(reducers, { metaReducers }),
    provideEffects(SidebarEffects, TechnologyEffects, ContentEffects,TopicEffects,BlogEffects,StarredEffects),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideStoreDevtools({
      maxAge: 25, logOnly: !isDevMode(), autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ],
};
