import { firstValueFrom, of, tap } from "rxjs";
import { AsyncManager } from "./async-manager";

describe('AsyncManager', () => {
  let manager: AsyncManager;

  beforeEach(() => {
    manager = new AsyncManager();
  });

  it('should invoke a stream without deferring', async () => {
    let value: string | undefined;
    const stream = firstValueFrom(manager.invoke('call', of('data').pipe(tap(x => value = x))));
    expect(value).toBe('data');

    expect(await stream).toBe('data');
  });

  it('should invoke a stream with deferring', async () => {
    manager.defer(true);

    let value: string | undefined;
    const stream = firstValueFrom(manager.invoke('call', of('data').pipe(tap(x => value = x))));
    expect(value).toBeUndefined();

    manager.complete('call');
    expect(value).toBe('data');

    expect(await stream).toBe('data');
  });

  it('should invoke 2 streams without deferring', async () => {
    let value1: string | undefined;
    let value2: string | undefined;
    const stream1 = firstValueFrom(manager.invoke('call1', of('data1').pipe(tap(x => value1 = x))));
    const stream2 = firstValueFrom(manager.invoke('call2', of('data2').pipe(tap(x => value2 = x))));
    expect(value1).toBe('data1');
    expect(value2).toBe('data2');

    expect(await stream1).toBe('data1');
    expect(await stream2).toBe('data2');
  });

  it('should invoke 2 streams with deferring', async () => {
    manager.defer(true);

    let value1: string | undefined;
    let value2: string | undefined;
    const stream1 = firstValueFrom(manager.invoke('call1', of('data1').pipe(tap(x => value1 = x))));
    const stream2 = firstValueFrom(manager.invoke('call2', of('data2').pipe(tap(x => value2 = x))));
    expect(value1).toBeUndefined();
    expect(value2).toBeUndefined();

    manager.complete('call1', 'call2');
    expect(value1).toBe('data1');
    expect(value2).toBe('data2');

    expect(await stream1).toBe('data1');
    expect(await stream2).toBe('data2');
  });

  it('should complete all deferred streams', async () => {
    manager.defer(true);

    let value1: string | undefined;
    let value2: string | undefined;
    const stream1 = firstValueFrom(manager.invoke('call1', of('data1').pipe(tap(x => value1 = x))));
    const stream2 = firstValueFrom(manager.invoke('call2', of('data2').pipe(tap(x => value2 = x))));
    expect(value1).toBeUndefined();
    expect(value2).toBeUndefined();

    manager.completeAll();
    expect(value1).toBe('data1');
    expect(value2).toBe('data2');

    expect(await stream1).toBe('data1');
    expect(await stream2).toBe('data2');
  });
});
