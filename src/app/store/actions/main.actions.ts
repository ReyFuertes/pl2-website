import { createAction, props } from '@ngrx/store';
import { IChangePassword, IResponseDetail } from 'src/app/models/detail.model';
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
  changePasswordAction = '[App] change password',
  changePasswordSuccessAction = '[App] change password (success)',
  clearChangePasswordAction = '[App] clear change password',
  getOnlineCountAction = '[App] online count',
  getOnlineCountSuccessAction = '[App] online count (success)',
  getPvpStatsAction = '[App] get pvp stats',
  getPvpStatsSuccessAction = '[App] pvp stats (success)',
  getPkStatsAction = '[App] get pk stats',
  getPkStatsSuccessAction = '[App] pk stats (success)',
  getgrandBossAction = '[App] get grandboss stats',
  getgrandBossSuccessAction = '[App] pk grandboss (success)',
}
export const getgrandBossAction = createAction(
  AppActionTypes.getgrandBossAction
);
export const getgrandBossSuccessAction = createAction(
  AppActionTypes.getgrandBossSuccessAction,
  props<{ response: any }>()
);
export const getPkStatsAction = createAction(
  AppActionTypes.getPkStatsAction
);
export const getPkStatsSuccessAction = createAction(
  AppActionTypes.getPkStatsSuccessAction,
  props<{ response: any }>()
);
export const getPvpStatsAction = createAction(
  AppActionTypes.getPvpStatsAction
);
export const getPvpStatsSuccessAction = createAction(
  AppActionTypes.getPvpStatsSuccessAction,
  props<{ response: any }>()
);
export const getOnlineCountAction = createAction(
  AppActionTypes.getOnlineCountAction
);
export const getOnlineCountSuccessAction = createAction(
  AppActionTypes.getOnlineCountSuccessAction,
  props<{ response: any }>()
);
export const clearChangePasswordAction = createAction(
  AppActionTypes.clearChangePasswordAction
);
export const changePasswordAction = createAction(
  AppActionTypes.changePasswordAction,
  props<{ payload: IChangePassword }>()
);
export const changePasswordSuccessAction = createAction(
  AppActionTypes.changePasswordSuccessAction,
  props<{ response: string }>()
);
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