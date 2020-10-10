import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';

export const selectedState = (state: AppState) => state.character;
export const getCharacterDetailSelector = createSelector(
  selectedState,
  state => state?.detail
);
