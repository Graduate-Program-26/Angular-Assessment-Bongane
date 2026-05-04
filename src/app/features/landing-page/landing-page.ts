import { Component } from '@angular/core';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { Header } from './components/header/header';

@Component({
  selector: 'app-landing-page',
  imports: [NzButtonModule, Header],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  size: NzButtonSize = 'large';
}
