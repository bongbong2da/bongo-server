export const makePagination = (params: {
  page: number;
  size: number;
  totalCount: number;
}) => {
  const { page, size, totalCount } = params;
  const totalPages = Math.ceil(totalCount / size);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return {
    page,
    size,
    totalCount,
    totalPages,
    hasPrev,
    hasNext,
  };
};
