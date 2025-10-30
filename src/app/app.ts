import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Theme, ThemeManager } from '@app/theme';
import { GamingTools } from '@app/gaming-tools';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, RouterLink, DecimalPipe,
    MatToolbarModule, MatMenuModule,
    MatButtonModule, MatIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly _themes = inject(ThemeManager);
  protected readonly _gaming = inject(GamingTools);

  readonly title = signal('arthisan');

  /**
   * Gets an active icon for the menu option.
   * @param theme Theme to get the icon for.
   * @returns The icon name.
   */
  protected _getThemeIcon(theme: Theme): string {
    return this._themes.current().id === theme.id ? 'radio_button_checked' : 'radio_button_unchecked'
  }
}
