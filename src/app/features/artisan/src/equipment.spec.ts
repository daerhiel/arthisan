import { Equipment } from "./equipment";

describe('Equipment', () => {
  let equipment: Equipment;

  beforeEach(() => {
    equipment = new Equipment(0.05);
  });

  it('should set default properties', () => {
    expect(equipment.base).toBe(0.05);
    expect(equipment.level()).toBe(250);
    expect(equipment.chance).toBe(0.3);
  });
});
