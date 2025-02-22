import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideThemes } from '@app/theme';
import { routes } from './app.routes';

/**
 * List of available application themes.
 */
export const themes = [
  { id: 'rose-red', name: 'Rose & Red' },
  { id: 'azure-blue', name: 'Azure & Blue' },
  { id: 'magenta-violet', name: 'Magenta & Violet' },
  { id: 'cyan-orange', name: 'Cyan & Orange' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideThemes(themes)
  ]
};
