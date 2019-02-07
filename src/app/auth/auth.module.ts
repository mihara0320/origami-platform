import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { AuthComponent } from './containers/auth/auth.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';

import { SharedModule } from '@shared/shared.module';


export const CONTAINERS = [AuthComponent];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxAuthFirebaseUIModule,
  ],
  declarations: CONTAINERS,
  exports: CONTAINERS
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [
        AuthService,
        AuthGuard
      ],
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild([
      { path: 'auth', component: AuthComponent },
      // { path: 'reg', component: SignupPageComponent },
    ]),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class RootAuthModule { }