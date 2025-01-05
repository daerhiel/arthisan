import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentHarness, parallel } from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

import { AppComponent } from './app.component';
import { provideThemes } from './theme';
import { themes } from './app.config';

class AppComponentHarness extends ComponentHarness {
  static hostSelector = 'app-root';

  getToolbar = this.locatorFor(MatToolbarHarness);
  getThemeButton = this.locatorFor(MatButtonHarness);
  getThemeMenu = this.locatorFor(MatMenuHarness);
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let harness: AppComponentHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideThemes(themes)],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, AppComponentHarness);
  });

  it(`should have the 'arthisan' title`, () => {
    expect(component.title).toEqual('arthisan');
  });

  it('should render header', async () => {
    const toolbar = await harness.getToolbar();

    expect(toolbar).toBeTruthy();
  });

  it('should not display theme menu by default', async () => {
    const menu = await harness.getThemeMenu();
    const items = await menu.getItems();

    expect(await menu.isOpen()).toBeFalsy();
    expect(await parallel(() => items.map(x => x.getText()))).toEqual([]);
  });

  it('should display theme menu on theme button click', async () => {
    const button = await harness.getThemeButton();
    await button.click();
    const menu = await harness.getThemeMenu();
    const items = await menu.getItems();

    expect(await menu.isOpen()).toBeTruthy();
    expect(await parallel(() => items.map(x => x.getText()))).toEqual(themes.map(x => x.name));
  });
});
