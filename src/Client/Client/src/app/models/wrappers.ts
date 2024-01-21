export interface Result {
  messages: string[];
  succeeded: boolean;
}

export interface TResult<T> extends Result {
  data: T;
}
