export type ApiResponse<T> = {
  errorMessages?: string[];
  isSuccess: boolean;
  result: T;
};
