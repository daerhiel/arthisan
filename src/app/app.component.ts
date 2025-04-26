import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Theme, ThemeManager } from '@app/theme';
import { NwBuddy } from './nw-buddy';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, RouterLink,
    MatToolbarModule, MatMenuModule,
    MatButtonModule, MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // eslint-disable-next-line no-unused-private-class-members
  readonly #nw = inject(NwBuddy);
  protected readonly _themes = inject(ThemeManager);

  title = 'arthisan';

  /**
   * Gets an active icon for the menu option.
   * @param theme Theme to get the icon for.
   * @returns The icon name.
   */
  protected _getThemeIcon(theme: Theme): string {
    return this._themes.current().id === theme.id ? 'radio_button_checked' : 'radio_button_unchecked'
  }
}
