import { getUrl } from './utilities';

export const baseUrl = 'https://localhost';

describe('getUrl', () => {
  it('should build version base url', () => {
    const actual = getUrl(baseUrl, 'v1');

    expect(actual).toEqual(`${baseUrl}/v1`);
  });

  it('should build version / controller url', () => {
    const actual = getUrl(baseUrl, 'v1', ['controller']);

    expect(actual).toEqual(`${baseUrl}/v1/controller`);
  });

  it('should build version / controller / id url', () => {
    const id = '#1234';
    const actual = getUrl(baseUrl, 'v1', ['controller', id]);

    expect(actual).toEqual(`${baseUrl}/v1/controller/${id}`);
  });

  it('should build version single empty query url', () => {
    const actual = getUrl(baseUrl, 'v1', ['controller'], {});

    expect(actual).toEqual(`${baseUrl}/v1/controller`);
  });

  it('should build version single string query url', () => {
    const name = 'query', value = 'value';
    const actual = getUrl(baseUrl, 'v1', ['controller'], { [name]: value });

    expect(actual).toEqual(`${baseUrl}/v1/controller?${name}=${encodeURIComponent(value)}`);
  });

  it('should build version single number query url', () => {
    const name = 'query', value = 10;
    const actual = getUrl(baseUrl, 'v1', ['controller'], { [name]: value });

    expect(actual).toEqual(`${baseUrl}/v1/controller?${name}=${encodeURIComponent(value)}`);
  });

  it('should build version single number query url', () => {
    const name = 'query', value = new Date();
    const actual = getUrl(baseUrl, 'v1', ['controller'], { [name]: value });

    expect(actual).toEqual(`${baseUrl}/v1/controller?${name}=${encodeURIComponent(value.toISOString())}`);
  });
});
