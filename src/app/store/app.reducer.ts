import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppReducer, MainState } from './reducers/main.reducer';
import { CharacterReducer, CharacterState } from './reducers/character.reducer';

export interface AppState {
  main: MainState,
  character: CharacterState
}

export const reducers: ActionReducerMap<AppState> = {
  main: AppReducer,
  character: CharacterReducer
};

