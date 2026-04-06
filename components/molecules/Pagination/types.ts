export type PaginationProps = {
  page: number;
  totalPages: number;
  onPaginationChange: (page: number) => void;
};
