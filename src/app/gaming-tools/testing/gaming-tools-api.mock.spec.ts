import { firstValueFrom } from 'rxjs';

import { commodities, GamingToolsApiMock } from './gaming-tools-api.mock';

describe('GamingToolsApiMock', () => {
  let mock: GamingToolsApiMock;

  beforeEach(() => {
    mock = new GamingToolsApiMock();
  });

  it('should return mock servers', async () => {
    const result = await firstValueFrom(mock.getServers());
    expect(result).toEqual([
      { name: 'Server1', age: 100 },
      { name: 'Server2', age: 200 },
      { name: 'Server3', age: 300 }
    ]);
  });

  it('should return mock commodities for Server1', async () => {
    const result = await firstValueFrom(mock.getServerPrices('Server1'));
    expect(result).toEqual(commodities);
  });

  it('should return empty array for unknown server', async () => {
    const result = await firstValueFrom(mock.getServerPrices('Unknown'));
    expect(result).toEqual([]);
  });
});

