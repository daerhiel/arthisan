import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentHarness, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MAT_ICONS, withStyleSheet } from '@app/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { AppComponent } from './app.component';
import { provideThemes } from './theme';
import { themes } from './app.config';

class AppComponentHarness extends ComponentHarness {
  static hostSelector = 'app-root';

  getToolbar = this.locatorFor(MatToolbarHarness);
  getThemeButton = this.locatorFor(MatButtonHarness.with({ ancestor: '[app-theme]', selector: '#theme' }));
  getThemeMenu = this.locatorFor(MatMenuHarness.with({ ancestor: '[app-theme]' }));
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let harness: AppComponentHarness;

  beforeAll(withStyleSheet(MAT_ICONS));

  beforeEach(() => {
    localStorage.clear();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, AppComponent],
      providers: [
        provideRouter([]), provideThemes(themes),
        { provide: NwBuddyApi, useClass: NwBuddyApiMock },
        { provide: GamingToolsApi, useClass: GamingToolsApiMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, AppComponentHarness);
    fixture.detectChanges();
  });

  it(`should have the 'arthisan' title`, () => {
    expect(component.title).toEqual('arthisan');
  });

  it('should render header', async () => {
    const toolbar = await harness.getToolbar();

    expect(toolbar).toBeTruthy();
  });

  it('should render theme button', async () => {
    const button = await harness.getThemeButton();
    expect(button).toBeTruthy();

    const icon = await button.getHarness(MatIconHarness);
    expect(await icon.getName()).toEqual('format_color_fill');
  });

  it('should not display theme menu by default', async () => {
    const menu = await harness.getThemeMenu();
    const items = await menu.getItems();

    expect(await menu.isOpen()).toBeFalse();
    expect(await parallel(() => items.map(x => x.getText()))).toEqual([]);
  });

  it('should display theme menu on theme button click', async () => {
    const button = await harness.getThemeButton();
    await button.click();

    const menu = await harness.getThemeMenu();
    const items = await menu.getItems();

    expect(await menu.isOpen()).toBeTrue();
    expect(await parallel(() => items.map(x => x.getText()))).toEqual(themes.map(x => x.name));
  });
});
