import { provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { APP_THEMES, provideThemes, Theme, ThemeManager } from './theme-manager';

describe('provideThemes', () => {
  it('should return a provider', () => {
    const themes = [{ id: 'default', name: 'Default' }];
    const provider = provideThemes(themes);
    expect(provider).toBeTruthy();
    expect(provider.provide).toBe(APP_THEMES);
    expect(provider.useValue).toEqual(themes);
  });
});

describe('ThemeManager', () => {
  let service: ThemeManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });

    service = TestBed.inject(ThemeManager);
  });

  it('should contain empty registry by default', () => {
    expect(service.registry()).toEqual([]);
  });

  const themes: Theme[][] = [
    [{ id: 'default', name: 'Default' }],
    [{ id: 'dark', name: 'Dark' }, { id: 'light', name: 'Light' }],
  ];

  themes.forEach(themes => {
    it(`should register ${themes.length} themes`, () => {
      service.register(...themes);
      expect(service.registry()).toEqual(themes);
    });
  });

  it('should have unknown current theme by default', () => {
    expect(service.current()).toEqual({ id: '#unknown', name: 'Unknown' });
  });

  it('should activate a theme', () => {
    service.register({ id: 'default', name: 'Default' });
    service.set('default');
    expect(service.current()).toEqual({ id: 'default', name: 'Default' });
  });

  it('should not activate an unknown theme', () => {
    expect(() => service.set('unknown')).toThrowError(/theme '.*' does not exist/i);
  });
});
