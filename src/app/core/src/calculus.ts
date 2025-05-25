export function greater(a: number | null, b: number | null): boolean {
  return a != null && b != null ? a > b : a != null ? true : false;
}

export function max(...values: number[]): number;
export function max(...values: (number | null)[]): number | null;
export function max(...values: (number | null)[]): number | null {
  if (values.length === 0) {
    return null;
  }
  let max: number | null = null;
  for (const value of values) {
    if (value == null || isNaN(value)) {
      continue;
    }
    if (max == null || value > max) {
      max = value;
    }
  }
  return max;
}

export function product(a: number, b: number): number;
export function product(a: number, b: number | null): number | null;
export function product(a: number | null, b: number): number | null;
export function product(a: number | null, b: number | null): number | null;
export function product(a: number | null, b: number | null): number | null {
  if (a == null || isNaN(a)) {
    return null;
  }
  if (b == null || isNaN(b)) {
    return null;
  }
  return a * b;
}

export function ratio(a: number, b: number): number;
export function ratio(a: number, b: number | null): number | null;
export function ratio(a: number | null, b: number): number | null;
export function ratio(a: number | null, b: number | null): number | null;
export function ratio(a: number | null, b: number | null): number | null {
  if (a == null || isNaN(a)) {
    return null;
  }
  if (b == null || isNaN(b)) {
    return null;
  }
  return a / b;
}

export function sum(a: number, b: number): number;
export function sum(a: number, b: number | null): number;
export function sum(a: number | null, b: number): number;
export function sum(a: number | null, b: number | null): number | null;
export function sum(a: number | null, b: number | null): number | null {
  if ((a == null || isNaN(a)) && (b == null || isNaN(b))) {
    return null;
  }
  if (a == null || isNaN(a)) {
    return b;
  }
  if (b == null || isNaN(b)) {
    return a;
  }
  return a + b;
}

export function subtract(a: number, b: number): number;
export function subtract(a: number, b: number | null): number;
export function subtract(a: number | null, b: number): number;
export function subtract(a: number | null, b: number | null): number | null;
export function subtract(a: number | null, b: number | null): number | null {
  if ((a != null && !isNaN(a)) && (b != null && !isNaN(b))) {
    return a - b;
  }
  if (a != null && !isNaN(a)) {
    return a;
  }
  if (b != null && !isNaN(b)) {
    return -b;
  }
  return null;
}
