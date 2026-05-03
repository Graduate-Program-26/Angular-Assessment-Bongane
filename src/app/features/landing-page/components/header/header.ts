import { Component } from '@angular/core';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  template: `
    <header class="landing-page-header">
      <div class="logo">
        <span class="fancy-logo-text">ᐃᑕ</span>
        TUNE <span class="stylized-logo-text">IN</span>
      </div>
      <app-theme-toggle />
    </header>
  `,
  styles: `
    .fancy-logo-text {
      font-size: 30px;
    }
    .landing-page-header {
      position: sticky;
      padding: 30px;
      background: linear-gradient(
        90deg,
        rgba(134, 128, 242, 1) 0%,
        rgba(41, 75, 214, 1) 50%,
        rgba(74, 73, 73, 1) 100%
      );
    }

    .logo {
      font-size: xx-large;
    }

    .stylized-logo-text {
      font-style: oblique;
    }
  `,
  imports: [ThemeToggle],
})
export class Header {}
