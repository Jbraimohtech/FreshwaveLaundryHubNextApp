export default function Loading() {
  return (
    <div
      className="page-shell flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#d7e7dc] border-t-[#116c83]" />
    </div>
  );
}
