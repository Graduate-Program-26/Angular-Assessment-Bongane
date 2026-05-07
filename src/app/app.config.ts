import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  SunOutline,
  MoonOutline,
  MoreOutline,
  HeartOutline,
  HeartFill,
  MenuFoldOutline,
  MenuUnfoldOutline,
} from '@ant-design/icons-angular/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzI18n(en_US),
    provideNzIcons([
      SunOutline,
      MoonOutline,
      MoreOutline,
      HeartOutline,
      HeartFill,
      MenuFoldOutline,
      MenuUnfoldOutline,
    ]),
  ],
};
