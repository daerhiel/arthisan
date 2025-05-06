import { GamingToolsApiMock } from './gaming-tools-api.mock';
import { Commodity, GameServer } from '@app/gaming-tools';

describe('GamingToolsApiMock', () => {
  let mock: GamingToolsApiMock;

  beforeEach(() => {
    mock = new GamingToolsApiMock();
  });

  it('should return mock servers', (done) => {
    mock.getServers().subscribe((servers: GameServer[]) => {
      expect(servers.length).toBe(3);
      expect(servers[0].name).toBe('Server1');
      expect(servers[1].age).toBe(200);
      done();
    });
  });

  it('should return mock commodities for Server1', (done) => {
    mock.getServerPrices('Server1').subscribe((commodities: Commodity[]) => {
      expect(commodities.length).toBe(2);
      expect(commodities[0].id).toBe('gold');
      expect(commodities[1].price).toBe(50);
      done();
    });
  });

  it('should return empty array for unknown server', (done) => {
    mock.getServerPrices('Unknown').subscribe((commodities: Commodity[]) => {
      expect(commodities.length).toBe(0);
      done();
    });
  });
});

