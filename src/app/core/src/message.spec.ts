import { Message, MessageType } from './message';

describe('Message', () => {
  it('should create a message', () => {
    const message = new Message(MessageType.Info, 'Test message');
    expect(message.type).toBe(MessageType.Info);
    expect(message.data).toBe('Test message');
    expect(message.timeout).toBe(12000);
  });

  it('should create a message with a custom object', () => {
    const msg = new Message(MessageType.Success, { foo: 'bar' }, 5000);
    expect(msg.type).toBe(MessageType.Success);
    expect(msg.data).toEqual({ foo: 'bar' });
    expect(msg.timeout).toBe(5000);
  });
});
