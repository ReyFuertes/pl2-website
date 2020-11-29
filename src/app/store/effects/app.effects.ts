import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { loginAction, loginSuccessAction, loginfailedAction, logoutAction, logoutSuccessAction, registerAction, registerSuccessAction, registerFailedAction, changePasswordAction, changePasswordSuccessAction, getOnlineCountAction, getOnlineCountSuccessAction, getPvpStatsAction, getPvpStatsSuccessAction, getPkStatsAction, getPkStatsSuccessAction, getgrandBossAction, getgrandBossSuccessAction } from '../actions/main.actions';
import { AuthService } from 'src/app/services/login.service'; XMLHttpRequest
import { AppState } from '../app.reducer';
import { AuthType } from 'src/app/models/generic.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ChangepasswordService } from 'src/app/services/change-password';
import { CharacterService } from 'src/app/services/character.service';
import { GrandbossService } from 'src/app/services/grandboss.server';

@Injectable()
export class AppEffect {
  getgrandBossAction$ = createEffect(() => this.actions$.pipe(
    ofType(getgrandBossAction),
    mergeMap(() => {
      return this.grandbossSrv.getAll().pipe(
        map((response: any) => {
          return getgrandBossSuccessAction({ response });
        })
      )
    })
  ));

  getPkStatsAction$ = createEffect(() => this.actions$.pipe(
    ofType(getPkStatsAction),
    mergeMap(() => {
      return this.characterSrv.getAll('pk').pipe(
        map((response: any) => {
          return getPkStatsSuccessAction({ response });
        })
      )
    })
  ));
  getPvpStatsAction$ = createEffect(() => this.actions$.pipe(
    ofType(getPvpStatsAction),
    mergeMap(() => {
      return this.characterSrv.getAll('pvp').pipe(
        map((response: any) => {
          return getPvpStatsSuccessAction({ response });
        })
      )
    })
  ));
  getOnlineCountAction$ = createEffect(() => this.actions$.pipe(
    ofType(getOnlineCountAction),
    mergeMap(() => {
      return this.characterSrv.getAll().pipe(
        map((response: any) => {
          return getOnlineCountSuccessAction({ response });
        })
      )
    })
  ));
  changePasswordAction$ = createEffect(() => this.actions$.pipe(
    ofType(changePasswordAction),
    mergeMap(({ payload }) => {
      return this.authSrv.post(payload, 'change-password').pipe(
        map((response: any) => {
          return changePasswordSuccessAction({ response });
        })
      )
    })
  ));
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
  constructor(private router: Router, 
    private store: Store<AppState>,
    private characterSrv: CharacterService,
    private grandbossSrv: GrandbossService,
    private actions$: Actions, 
    private authSrv: AuthService) { }
}