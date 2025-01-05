import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ThemeManager } from '@app/theme';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule, MatMenuModule,
    MatButtonModule, MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly _themes = inject(ThemeManager);

  title = 'arthisan';
}
