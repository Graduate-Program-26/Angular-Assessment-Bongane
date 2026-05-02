import { Injectable } from '@angular/core';

enum ThemeType {
  dark = 'dark',
  default = 'default',
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme = ThemeType.default;

  private reverseTheme(theme: string): ThemeType {
    return theme === ThemeType.dark ? ThemeType.default : ThemeType.dark;
  }

  private removeUnusedTheme(theme: ThemeType): void {
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }

  public toggleTheme() {
    // this.currentTheme = this.reverseTheme(this.currentTheme);
    const root = document.documentElement;

    if (this.currentTheme === 'default') {
      root.classList.add('dark-theme');
      this.currentTheme = ThemeType.dark;
    } else {
      root.classList.remove('dark-theme');
      this.currentTheme = ThemeType.default;
    }
    // return this.loadTheme(false);
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }

  public loadTheme(firstLoad = true): Promise<Event> {
    const theme = this.currentTheme;
    if (firstLoad) {
      document.documentElement.classList.add(theme);
    }
    return new Promise<Event>((resolve, reject) => {
      this.loadCss(`${theme}.css`, theme).then(
        (e) => {
          if (!firstLoad) {
            document.documentElement.classList.add(theme);
          }
          this.removeUnusedTheme(this.reverseTheme(theme));
          resolve(e);
        },
        (e) => reject(e),
      );
    });
  }

  switchToDarkMode() {
    this.loadCss('dark.css', 'dark').then(() => {
      // Remove light theme if it exists
      const lightTheme = document.getElementById('default');
      if (lightTheme) lightTheme.remove();
    });
  }
  switchToLightMode() {
    this.loadCss('default.css', 'default').then(() => {
      // Remove dark theme if it exists
      const darkTheme = document.getElementById('dark');
      if (darkTheme) darkTheme.remove();
    });
  }
}
