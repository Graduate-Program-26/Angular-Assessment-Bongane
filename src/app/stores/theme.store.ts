import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ThemeType } from '../models/theme.model';

type ThemeState = {
  currentTheme: ThemeType;
};

const initialState: ThemeState = {
  currentTheme: 'default',
};

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setTheme(theme: ThemeType) {
      patchState(store, { currentTheme: theme });
    },

    toggleTheme() {
      patchState(store, (state) => ({
        currentTheme: state.currentTheme === ThemeType.dark ? ThemeType.default : ThemeType.dark,
      }));
    },
  })),
);
