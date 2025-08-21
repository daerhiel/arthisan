import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { GamingToolsApi } from './gaming-tools-api';
import { GameServer } from './game-server';
import { Commodity } from './commodity';

describe('GamingToolsApi', () => {
  let service: GamingToolsApi;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(GamingToolsApi);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should get servers', async () => {
    const servers = firstValueFrom(service.getServers());

    const server: GameServer = { name: 'TestServer', age: 25 };
    controller.expectOne('https://gaming.tools/prices/nwmp/servers').flush([server]);

    expect(await servers).toEqual([server]);
  });

  it('should get server prices', async () => {
    const serverName = 'TestServer';
    const prices = firstValueFrom(service.getServerPrices(serverName));

    const commodity: Commodity = { id: '123', price: 100 };
    controller.expectOne(`https://gaming.tools/prices/nwmp?serverName=${serverName}`).flush([commodity]);

    expect(await prices).toEqual([commodity]);
  });
});
