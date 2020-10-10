import { createReducer, on, Action } from "@ngrx/store";
import { AuthType } from 'src/app/models/generic.model';
import { loginSuccessAction, logoutSuccessAction } from '../actions/main.actions';

export interface CharacterState {
  detail?: any
}
export const initialState: CharacterState = {
  detail: null
};
const reducer = createReducer(
  initialState,
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