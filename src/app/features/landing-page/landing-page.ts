import { Component, inject } from '@angular/core';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { Header } from './components/header/header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [NzButtonModule, Header],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  protected readonly size: NzButtonSize = 'large';
  private router = inject(Router);

  login() {
    this.router.navigate(['/dashboard']);
  }
}
