import { createReducer, on, Action } from "@ngrx/store";
import { AuthType } from 'src/app/models/generic.model';
import { getgrandBossSuccessAction, getOnlineCountSuccessAction, getPkStatsSuccessAction, getPvpStatsSuccessAction, loginSuccessAction, logoutSuccessAction } from '../actions/main.actions';

export interface CharacterState {
  detail?: any,
  onlineCount?: any;
  pvpkills?: any;
  pkkills?: any;
  grandboss?: any;
}
export const initialState: CharacterState = {
  detail: null,
  onlineCount: null,
  pvpkills: null,
  pkkills: null,
  grandboss: null
};
const reducer = createReducer(
  initialState,
  on(getgrandBossSuccessAction, (state, action) => {
    return Object.assign({}, state, { grandboss: action.response });
  }),
  on(getPkStatsSuccessAction, (state, action) => {
    return Object.assign({}, state, { pkkills: action.response });
  }),
  on(getPvpStatsSuccessAction, (state, action) => {
    return Object.assign({}, state, { pvpkills: action.response });
  }),
  on(getOnlineCountSuccessAction, (state, action) => {
    return Object.assign({}, state, { onlineCount: action.response });
  }),
  on(logoutSuccessAction, (state) => {
    return Object.assign({}, state, { detail: null });
  }),
  on(loginSuccessAction, (state, action) => {
    return Object.assign({}, state, { detail: action?.response?.detail });
  }),
);
export function CharacterReducer(state: CharacterState, action: Action) {
  return reducer(state, action);
}