import { injectStyleSheet, withStyleSheet, MAT_ICONS } from './styles';

describe('injectStyleSheet', () => {
  afterEach(() => {
    document.querySelectorAll('link[href="' + MAT_ICONS + '"]').forEach(link => link.remove());
  });

  it('injects a stylesheet link into the document head', () => {
    injectStyleSheet(MAT_ICONS);
    const link = document.querySelector<HTMLLinkElement>('link[href="' + MAT_ICONS + '"]');
    expect(link).not.toBeNull();
    expect(link?.rel).toBe('stylesheet');
  });

  it('throws if style is not provided', () => {
    expect(() => injectStyleSheet('')).toThrowError('Style is required');
  });
});

describe('withStyleSheet', () => {
  afterEach(() => {
    document.querySelectorAll('link[href="' + MAT_ICONS + '"]').forEach(link => link.remove());
  });

  it('returns a function that injects the stylesheet', () => {
    const inject = withStyleSheet(MAT_ICONS);
    inject();
    const link = document.querySelector<HTMLLinkElement>('link[href="' + MAT_ICONS + '"]');
    expect(link).not.toBeNull();
    expect(link?.rel).toBe('stylesheet');
  });
});
