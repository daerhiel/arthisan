import { Component, computed, input } from '@angular/core';

import { environment } from '@environments/environment';
import { ItemRarity } from '@app/nw-data';

@Component({
  selector: 'picture[nw-icon]',
  imports: [],
  host: {
    class: 'nw-icon nw-item-icon-frame nw-item-icon-bg',
    '[class]': '_classes()',
  },
  templateUrl: './nw-icon.html',
  styleUrl: './nw-icon.scss'
})
export class NwIcon {
  protected readonly _baseUrl = environment.apiNwBuddyContentUrl;

  protected readonly _classes = computed(() => {
    const classes = [];

    const rarity = this.rarity();
    rarity && classes.push(`nw-item-rarity-${rarity}`);

    const named = this.named();
    named && classes.push('named');

    const size = this.size() ?? 10;
    size && classes.push(`app-w-${size}`);

    return classes;
  });

  readonly path = input.required<string | null | undefined>();
  readonly name = input.required<string | null | undefined>();
  readonly rarity = input.required<ItemRarity | null | undefined>();
  readonly named = input<boolean>(false);
  readonly size = input<number | null | undefined>();
}
