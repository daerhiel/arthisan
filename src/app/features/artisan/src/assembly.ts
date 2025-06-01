import { computed } from '@angular/core';

import { greater } from '@app/core';
import { Purchase } from './purchase';
import { Craftable } from './craftable';
import { Projection } from './projection';

/**
 * Represents an assembly of craftable items, which includes projections based on blueprints.
 */
export class Assembly extends Purchase {
  override get bonus(): number | null {
    return this.projection?.blueprint.bonus ?? null;
  }

  /**
   * The list of projections for this assembly associated with source ingredients.
   */
  readonly #projections = computed(() =>
    this.entity.blueprints()?.map(blueprint => blueprint.request()) ?? null
  );
  get projections(): Projection[] | null {
    return this.#projections();
  }

  /**
   * The selected projection for this assembly.
   */
  readonly #projection = computed(() =>
    this.projections?.reduce((p, c) => greater(p.cost, c.cost) ? p : c) ?? null
  );
  get projection(): Projection | null {
    return this.#projection();
  }

  /**
   * Creates a new Assembly instance.
   * @param entity The craftable entity associated with this assembly.
   * @throws Will throw an error if the entity is invalid.
   */
  constructor(override readonly entity: Craftable) {
    super(entity);
  }
}
