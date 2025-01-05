import { computed, inject, Injectable, InjectionToken, signal, ValueProvider } from '@angular/core';

/**
 * Represents a Material theme definition.
 */
export interface Theme {
  id: string;
  name: string;
}

/**
 * Injection token for the list of available themes.
 */
export const APP_THEMES = new InjectionToken<Theme[]>('APP_THEMES');

/**
 * Provides a list of available themes to dependency injection container.
 * @param themes List of available themes.
 */
export function provideThemes(themes: Theme[]): ValueProvider {
  return { provide: APP_THEMES, useValue: themes };
}

/**
 * ID of the HTML element that holds the current theme.
 */
export const APP_THEME_ID = 'app-theme';

/**
 * Represents a service that manages the application themes.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeManager {
  readonly #registry = signal<Record<string, string>>({});
  readonly #current = signal<string | null>(null);

  /**
   * List of available themes.
   */
  readonly registry = computed(() => {
    return Object.entries(this.#registry()).map(([id, name]) => ({ id, name }));
  });

  /**
   * Currently activated theme.
   */
  readonly current = computed(() => {
    const id = this.#current() || '#unknown';
    const registry = this.#registry();
    const name = id in registry ? registry[id] : 'Unknown';
    return { id, name };
  });

  /**
   * Initializes a new instance of the ThemeManager class.
   */
  constructor() {
    this.register(...inject(APP_THEMES, { optional: true }) ?? []);
  }

  /**
   * Activates the specified theme.
   * @param id Theme identifier to activate.
   */
  set(id: string): void {
    if (!this.#registry()[id]) {
      throw new Error(`Theme '${id}' does not exist.`);
    }
    let style = document.getElementById(APP_THEME_ID) as HTMLStyleElement;
    if (!style) {
      style = document.createElement('link');
      style.id = APP_THEME_ID;
      document.head.appendChild(style);
    }
    style.setAttribute('href', `${id}.css`);
    style.setAttribute('rel', 'stylesheet');
    this.#current.set(id);
  }

  /**
   * Registers the specified themes.
   * @param themes Themes to register.
   */
  register(...themes: Theme[]): void {
    const values = this.#registry();
    const current = this.#current();
    for (const { id, name } of themes) {
      values[id] = name;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      current || this.set(id);
    }
    this.#registry.set(values);
  }
}
