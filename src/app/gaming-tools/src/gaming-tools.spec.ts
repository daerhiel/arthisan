import { TestBed } from '@angular/core/testing';
import { firstValueFrom, timer } from 'rxjs';

import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { GamingToolsApi } from './gaming-tools-api';
import { GamingTools } from './gaming-tools';

describe('GamingTools', () => {
  let service: GamingTools;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        { provide: GamingToolsApi, useClass: GamingToolsApiMock }
      ]
    });
    service = TestBed.inject(GamingTools);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get servers', () => {
    const servers = service.servers();
    expect(servers).toEqual([
      { name: 'Server1', age: 100 },
      { name: 'Server2', age: 200 },
      { name: 'Server3', age: 300 }
    ]);
  });

  it('should not have current server by default', () => {
    const server = service.server();
    expect(server).toBeNull();
  });

  it('should set current server', () => {
    const server = { name: 'Server1', age: 100 };
    service.select(server)
    expect(service.server()).toEqual(server);
  });

  it('should have empty commodities by default', () => {
    expect(service.commodities()).toEqual({});
  });

  it('should get commodities for selected server', async () => {
    const server = { name: 'Server1', age: 100 };
    service.select(server);

    while (service.isLoading()) {
      await firstValueFrom(timer(100));
    }
    expect(service.commodities()).toEqual({
      gold: 100,
      silver: 50
    });
  });

  it('should return empty commodities for null server', async () => {
    const server = { name: 'Server1', age: 100 };
    service.select(server);
    service.select(null!);

    while (service.isLoading()) {
      await firstValueFrom(timer(100));
    }
    expect(service.commodities()).toEqual({});
  });
});
