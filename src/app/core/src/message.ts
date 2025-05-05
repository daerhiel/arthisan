export enum MessageType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error'
}

export class Message<T> {
  constructor(
    public type: MessageType,
    public data: T,
    public timeout = 12000
  ) {}
}
