import { effect, inject, Injectable } from '@angular/core';
import { ThemeStore } from '../stores/theme.store';
import { ThemeType } from '../models/theme.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private store = inject(ThemeStore);

  constructor() {
    effect(() => {
      const theme = this.store.currentTheme();
      document.documentElement.classList.toggle('dark-theme', theme === ThemeType.dark);
    });
  }

  toggleTheme() {
    this.store.toggleTheme();
  }
}
