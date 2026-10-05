export function getTruncatedPagination(
  start = 1,
  currentPage: number,
  end: number,
  treshold = 5
) {
  if (currentPage > end)
    throw new Error('current page cannot be bigger than the total pages');

  if (currentPage < start)
    throw new Error('current page cannot be smaller than the first page');

  if (end === 1) return [1];

  const totalPages = end - start + 1;

  if (totalPages <= treshold) {
    const result = [];
    for (let i = start; i < end + 1; i++) {
      result.push(i);
    }
    return result;
  }

  if (currentPage === start) {
    return [start, start + 1, start + 2, '...', end];
  }

  if (currentPage === end) {
    return [start, '...', end - 2, end - 1, end];
  }

  const leftNeighbor = currentPage - 1 !== start ? currentPage - 1 : '';
  const rightNeighbor = currentPage + 1 !== end ? currentPage + 1 : '';
  const leftEllipsis = currentPage - 1 - start > 2 ? '...' : '';
  const rightEllipsis = end - (currentPage + 1) > 2 ? '...' : '';
  const showOnePageLeft = currentPage - 1 - start === 2 ? currentPage - 2 : '';
  const showOnePageRight = end - (currentPage + 1) === 2 ? currentPage + 2 : '';

  return [
    start,
    showOnePageLeft,
    leftEllipsis,
    leftNeighbor,
    currentPage,
    rightNeighbor,
    rightEllipsis,
    showOnePageRight,
    end,
  ].filter((item) => item !== '');
}
