import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';

export const selectedState = (state: AppState) => state.character;
export const getgrandBossSelector = createSelector(
  selectedState,
  state => state?.grandboss
);
export const getPkKillsSelector = createSelector(
  selectedState,
  state => state?.pkkills
);
export const getPvpKillsSelector = createSelector(
  selectedState,
  state => state?.pvpkills
);
export const getOnlineCountSelector = createSelector(
  selectedState,
  state => state?.onlineCount
);
export const getCharacterDetailSelector = createSelector(
  selectedState,
  state => state?.detail
);
