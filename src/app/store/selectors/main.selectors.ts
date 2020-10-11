import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

export const selectedState = (state: AppState) => state.main;
export const getLoginFailedCountSelector = createSelector(
  selectedState,
  state => state?.loginFailedCount
);
export const getLoginFailedMsgSelector = createSelector(
  selectedState,
  state => state?.loginFailedMsg
);
export const getRegisterFailedMsgSelector = createSelector(
  selectedState,
  state => state?.registerFailedMsg
);
export const getHasRegisteredSelector = createSelector(
  selectedState,
  state => state?.hasRegister
);
export const getHasLoginSelector = createSelector(
  selectedState,
  state => state?.loginStatus
);
