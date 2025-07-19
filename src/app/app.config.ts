import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners, provideZonelessChangeDetection
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { provideThemes } from '@app/theme';
import { EXPLORE_ITEM_CATEGORIES, EXPLORE_ITEM_CLASSES } from '@features/explorer';
import { routes } from './app.routes';

/**
 * List of available application themes.
 */
export const themes = [
  { id: 'new-world', name: 'New World' },
  { id: 'rose-red', name: 'Rose & Red' },
  { id: 'azure-blue', name: 'Azure & Blue' },
  { id: 'magenta-violet', name: 'Magenta & Violet' },
  { id: 'cyan-orange', name: 'Cyan & Orange' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([])),
    provideRouter(routes),
    provideThemes(themes),
    { provide: EXPLORE_ITEM_CATEGORIES, useValue: ['Faction'] },
    { provide: EXPLORE_ITEM_CLASSES, useValue: ['Resource', 'Gem'] }
  ]
};
