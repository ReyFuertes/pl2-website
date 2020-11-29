import { createReducer, on, Action } from "@ngrx/store";
import { AuthType } from 'src/app/models/generic.model';
import { changePasswordSuccessAction, clearChangePasswordAction, clearVariablesAction, loginfailedAction, loginSuccessAction, logoutSuccessAction, registerFailedAction, registerSuccessAction, resetLoginCountAction } from '../actions/main.actions';

export interface MainState {
  loginStatus: boolean,
  hasRegister: boolean,
  registerFailedMsg: string,
  loginFailedMsg: string,
  loginFailedCount: number,
  passwordChanged: boolean
 }
export const initialState: MainState = {
  loginStatus: null,
  hasRegister: null,
  registerFailedMsg: null,
  loginFailedMsg: null,
  loginFailedCount: 0,
  passwordChanged: null
};
const reducer = createReducer(
  initialState,
  on(clearChangePasswordAction, (state) => {
    return Object.assign({}, state, { passwordChanged: null });
  }),
  on(changePasswordSuccessAction, (state) => {
    return Object.assign({}, state, { passwordChanged: true });
  }),
  on(resetLoginCountAction, (state) => {
    return Object.assign({}, state, { loginFailedCount: 0 });
  }),
  on(loginfailedAction, (state, action) => {
    let loginFailedCount = state.loginFailedCount;
    loginFailedCount = loginFailedCount + 1;
    return Object.assign({}, state, { loginFailedMsg: action.response, loginFailedCount });
  }),
  on(registerFailedAction, (state, action) => {
    return Object.assign({}, state, { registerFailedMsg: action.response });
  }),
  on(clearVariablesAction, (state) => {
    return Object.assign({}, state, { hasRegister: null, registerFailedMsg: null });
  }),
  on(registerSuccessAction, (state, action) => {
    const hasRegister = action?.response?.status === AuthType.success ? true : false;
    return Object.assign({}, state, { hasRegister });
  }),
  on(logoutSuccessAction, (state) => {
    return Object.assign({}, state, { loginStatus: null });
  }),
  on(loginSuccessAction, (state, action) => {
    const loginStatus = action?.response?.status === AuthType.success ? true : false;
    return Object.assign({}, state, { loginStatus });
  }),
);
export function AppReducer(state: MainState, action: Action) {
  return reducer(state, action);
}