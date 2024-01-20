export interface IResult<T> {
  messages: string[];
  succeeded: boolean;
  data: T;
}
