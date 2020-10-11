import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { loginAction, loginSuccessAction, loginfailedAction, logoutAction, logoutSuccessAction, registerAction, registerSuccessAction, registerFailedAction } from '../actions/main.actions';
import { AuthService } from 'src/app/services/login.service'; XMLHttpRequest
import { AppState } from '../app.reducer';
import { AuthType } from 'src/app/models/generic.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class AppEffect {
  registerAction$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({ payload }) => {
      return this.authSrv.post(payload, 'register').pipe(
        map((response: any) => {
          return registerSuccessAction({ response });
        }), 
        catchError(() => of(registerFailedAction({ response: 'Invalid Fields, try again..' })))
      )
    })
  ));

  logoutAction$ = createEffect(() => this.actions$.pipe(
    ofType(logoutAction),
    mergeMap(() => {
      return this.authSrv.post({}, 'logout').pipe(
        tap((response: any) => {
          if (response.status === AuthType.success) {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/');
          }
        }),
        map((response: any) => {
          return logoutSuccessAction(response);
        })
      )
    })
  ));

  loginAction$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    mergeMap(({ payload }) => {
      return this.authSrv.post(payload, 'login').pipe(
        tap((response: any) => {
          if (response.status === AuthType.success) {
            localStorage.setItem('token', JSON.stringify(response.token));
          };
          this.router.navigateByUrl('account-info');
        }),
        map((response: any) => {
          return loginSuccessAction({ response, success: response.success });
        }),
        catchError(() => {
          return of(loginfailedAction({ response: 'Invalid Fields, try again..' }));
        })
      )
    })
  ));

  //
  constructor(private router: Router, private store: Store<AppState>, private actions$: Actions, private authSrv: AuthService) { }
}