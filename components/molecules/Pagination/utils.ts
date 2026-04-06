import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);

  const onPaginationChange = (page: number) => {
    setPage(page);
  };

  return { page, onPaginationChange };
};
