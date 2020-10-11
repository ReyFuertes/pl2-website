import { createAction, props } from '@ngrx/store';
import { IResponseDetail } from 'src/app/models/detail.model';
import { ILoginPayloadDto, IRegisterPayloadDto } from 'src/app/models/generic.model';

export enum AppActionTypes {
  loginAction = '[App] login',
  loginSuccessAction = '[App] login (success)',
  loginfailedAction = '[App] login (failed)',
  logoutAction = '[App] logout (failed)',
  logoutSuccessAction = '[App] logout (success)',
  registerAction = '[App] register',
  registerSuccessAction = '[App] register (success)',
  registerFailedAction = '[App] register (failed)',
  clearVariablesAction = '[App] clear variables',
  resetLoginCountAction = '[App] set login count',
}
export const resetLoginCountAction = createAction(
  AppActionTypes.resetLoginCountAction,
);
export const registerFailedAction = createAction(
  AppActionTypes.registerFailedAction,
  props<{ response: any }>()
);
export const clearVariablesAction = createAction(
  AppActionTypes.clearVariablesAction
);
export const registerAction = createAction(
  AppActionTypes.registerAction,
  props<{ payload: IRegisterPayloadDto }>()
);
export const registerSuccessAction = createAction(
  AppActionTypes.registerSuccessAction,
  props<{ response: any }>()
);
export const logoutAction = createAction(
  AppActionTypes.logoutAction,
);
export const logoutSuccessAction = createAction(
  AppActionTypes.logoutSuccessAction,
  props<{ response: boolean }>()
);
export const loginfailedAction = createAction(
  AppActionTypes.loginfailedAction,
  props<{ response: any }>()
);
export const loginAction = createAction(
  AppActionTypes.loginAction,
  props<{ payload: ILoginPayloadDto }>()
);
export const loginSuccessAction = createAction(
  AppActionTypes.loginSuccessAction,
  props<{ response: IResponseDetail, success?: string }>()
);