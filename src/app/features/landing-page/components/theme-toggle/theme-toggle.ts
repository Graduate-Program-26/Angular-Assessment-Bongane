import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ThemeService } from '../../../../services/theme-service';

@Component({
  selector: 'app-theme-toggle',
  imports: [NzSwitchModule, NzIconModule, FormsModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  protected themeService = inject(ThemeService);
  isDarkMode = signal(true);

  changeTheme(isDark: boolean) {
    this.themeService.toggleTheme();
  }
}
