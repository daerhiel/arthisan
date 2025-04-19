/**
 * Reference to the Material Icons stylesheet.
 */
export const MAT_ICONS = 'https://fonts.googleapis.com/icon?family=Material+Icons';

/**
 * Injects a stylesheet link into the document head.
 * @param style The URL of the stylesheet to inject.
 */
export function injectStyleSheet(style: string): void {
  if (!style) {
    throw new Error('Style is required');
  }

  const link = document.createElement('link');
  link.href = style;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

/**
 * Injects a stylesheet link into the document head if not already present.
 * @param style The URL of the stylesheet to inject.
 * @returns A function that injects the stylesheet when called.
 */
export function withStyleSheet(style: string) {
  return () => injectStyleSheet(style);
}
