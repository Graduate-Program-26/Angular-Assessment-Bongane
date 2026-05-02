import { Component } from '@angular/core';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-landing-page',
  imports: [ThemeToggle, NzButtonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {}
