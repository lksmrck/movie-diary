export type ApiResponse<T> = {
  errorMessage?: string;
  isSuccess: boolean;
  result: T;
};
