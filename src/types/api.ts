export type ApiResponse<T> = {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
};

export type PaginatedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
};
