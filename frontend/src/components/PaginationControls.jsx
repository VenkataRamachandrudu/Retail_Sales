export default function PaginationControls({
  page,
  totalPages,
  onPageChange,
  total
}) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="pagination">
      <div>
        Showing page {page} of {totalPages} ({total} records)
      </div>
      <div className="pagination-buttons">
        <button
          type="button"
          className="btn"
          disabled={prevDisabled}
          onClick={() => !prevDisabled && onPageChange(page - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn"
          disabled={nextDisabled}
          onClick={() => !nextDisabled && onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
