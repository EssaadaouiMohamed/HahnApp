export interface ApiResponse<T>
{
  data: T,
  messages: string[],
  succeeded: boolean
}
