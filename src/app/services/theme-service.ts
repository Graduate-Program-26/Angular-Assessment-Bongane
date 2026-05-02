import { Injectable } from '@angular/core';

enum ThemeType {
  dark = 'dark',
  default = 'default',
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme = ThemeType.default;

  public toggleTheme(isDark: boolean) {
    const root = document.documentElement;

    if (isDark) {
      root.classList.remove('dark-theme');
      this.currentTheme = ThemeType.default;
    } else {
      root.classList.add('dark-theme');
      this.currentTheme = ThemeType.dark;
    }
  }
}
