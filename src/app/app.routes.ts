// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { SignalTest } from './signalTest/signalTest';
import { LifeCycleHooksParent } from './lifecycleHooks/lifecycleHooks';
import { RxjsTest } from './rxjs-test/rxjs-test';
import { DynamicComponent } from './dynamic-component/dynamic-component';
import { InjectionTokenComp } from './injection-token/injection-token';
import { JSON_PLACEHOLDER_URL } from './injection-token/inject.interface';
import { UserForm } from './forms/user-form/user-form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'signal', component: SignalTest },
  { path: 'lifecycle', component: LifeCycleHooksParent },
  { path: 'rxjs', component: RxjsTest },
  { path: 'dynamic', component: DynamicComponent },
  { path: 'injectionToken', component: InjectionTokenComp, 
    providers: [
      {
        provide: JSON_PLACEHOLDER_URL,
        useValue: 'https://jsonplaceholder.typicode.com/posts',
      },
    ]
   },
  { path: 'forms', component: UserForm },
  { path: '**', redirectTo: '' } // Fallback route (optional)
];
