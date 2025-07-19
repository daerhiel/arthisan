import { Component, inject, provideZonelessChangeDetection } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentHarness, HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogHarness } from '@angular/material/dialog/testing';

import { I18n } from '@app/core';
import { Opener, getOpenerInputs } from './opener';

export class AppOpenerHarness extends ComponentHarness {
  static hostSelector = 'button[app-opener]';

  async getText(): Promise<string> {
    return (await this.host()).text();
  }

  async click(): Promise<void> {
    return (await this.host()).click();
  }
}

describe('getOpenerInputs', () => {
  it('should return opener inputs', () => {
    const object = { name: 'Test', value: 42 };
    const i18n = { translate: (key: string) => key } as unknown as I18n;

    const inputs = getOpenerInputs<typeof object, string, TestDialog>(x => x.name, TestDialog, {})(object, i18n);
    expect(inputs).toEqual({ value: 'Test', component: TestDialog, config: { data: object } });
  });
});

describe('Opener', () => {
  let component: Opener<unknown, unknown>;
  let fixture: ComponentFixture<Opener<unknown, unknown>>;
  let harness: AppOpenerHarness;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Opener],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(Opener);
    fixture.componentRef.setInput('component', TestDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();

    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, AppOpenerHarness);
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  afterEach(() => {
    TestBed.inject(MatDialog).closeAll();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no text by default', async () => {
    expect(component.value()).toBeFalsy();
    expect(await harness.getText()).toBeFalsy();
  });

  it('should render text', async () => {
    const value = 'Test Value';
    fixture.componentRef.setInput('value', value);

    expect(component.value()).toBe(value);
    expect(await harness.getText()).toBe(value);
  });

  it('should open dialog on click', async () => {
    const data = { message: 'Test Dialog' };
    fixture.componentRef.setInput('config', { data });
    await harness.click();

    const dialog = await loader.getHarness(MatDialogHarness);
    expect(await dialog.getText()).toBe(data.message);
  });
});

@Component({
  template: `<p>{{data?.message}}</p>`
})
export class TestDialog {
  readonly data = inject(MAT_DIALOG_DATA);
}
