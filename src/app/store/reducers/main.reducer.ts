import { createReducer, on, Action } from "@ngrx/store";
import { AuthType } from 'src/app/models/generic.model';
import { clearVariablesAction, loginSuccessAction, logoutSuccessAction, registerFailedAction, registerSuccessAction } from '../actions/main.actions';

export interface MainState {
  loginStatus: boolean,
  hasRegister: boolean,
  registerFailedMsg: string
 }
export const initialState: MainState = {
  loginStatus: null,
  hasRegister: null,
  registerFailedMsg: null
};
const reducer = createReducer(
  initialState,
  on(registerFailedAction, (state, action) => {
    return Object.assign({}, state, { registerFailedMsg: action.response });
  }),
  on(clearVariablesAction, (state) => {
    return Object.assign({}, state, { hasRegister: null });
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