import { greater, max, product, ratio, sum, subtract } from "./calculus";

describe('greater', () => {
  it('should return null if both arguments are null', () => {
    expect(greater(null, null)).toBeFalse();
  });

  it('should return null if first argument is null', () => {
    expect(greater(null, 5)).toBeFalse();
  });

  it('should return null if second argument is null', () => {
    expect(greater(5, null)).toBeTrue();
  });

  it('should return the greater of two numbers', () => {
    expect(greater(2, 3)).toBeFalse();
    expect(greater(3, 2)).toBeTrue();
    expect(greater(3, 3)).toBeFalse();
  });
});

describe('max', () => {
  it('should return null if both arguments are null', () => {
    expect(max(null, null)).toBeNull();
  });

  it('should return null if first argument is null', () => {
    expect(max(null, 5)).toEqual(5);
  });

  it('should return null if second argument is null', () => {
    expect(max(5, null)).toEqual(5);
  });

  it('should return the maximum of two numbers', () => {
    expect(max(2, 3)).toEqual(3);
    expect(max(3, 2)).toEqual(3);
    expect(max(3, 3)).toEqual(3);
  });
});

describe('product', () => {
  it('should return null if both arguments are null', () => {
    expect(product(null, null)).toBeNull();
  });

  it('should return null if first argument is null', () => {
    expect(product(null, 5)).toBeNull();
  });

  it('should return null if second argument is null', () => {
    expect(product(5, null)).toBeNull();
  });

  it('should return the product of two numbers', () => {
    expect(product(2, 3)).toEqual(6);
  });
});

describe('ratio', () => {
  it('should return null if both arguments are null', () => {
    expect(ratio(null, null)).toBeNull();
  });

  it('should return null if first argument is null', () => {
    expect(ratio(null, 5)).toBeNull();
  });

  it('should return null if second argument is null', () => {
    expect(ratio(5, null)).toBeNull();
  });

  it('should return the ratio of two numbers', () => {
    expect(ratio(6, 3)).toEqual(2);
  });
});

describe('sum', () => {
  it('should return null if both arguments are null', () => {
    expect(sum(null, null)).toBeNull();
  });

  it('should return the first argument if the second is null', () => {
    expect(sum(5, null)).toEqual(5);
  });

  it('should return the second argument if the first is null', () => {
    expect(sum(null, 5)).toEqual(5);
  });

  it('should return the sum of two numbers', () => {
    expect(sum(2, 3)).toEqual(5);
  });
});

describe('subtract', () => {
  it('should return null if both arguments are null', () => {
    expect(subtract(null, null)).toBeNull();
  });

  it('should return the first argument if the second is null', () => {
    expect(subtract(5, null)).toEqual(5);
  });

  it('should return the second argument if the first is null', () => {
    expect(subtract(null, 5)).toEqual(-5);
  });

  it('should return the difference of two numbers', () => {
    expect(subtract(5, 3)).toEqual(2);
  });
});
