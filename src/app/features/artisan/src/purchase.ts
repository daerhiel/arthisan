import { Entity } from "./entity";

export class Purchase {
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get bonus(): number | null {
    return null;
  }

  constructor(readonly entity: Entity) {
    if (!entity) {
      throw new Error('Invalid entity instance.');
    }
  }
}
