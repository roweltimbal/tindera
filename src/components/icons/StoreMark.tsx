export function StoreMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 13.5 7 6h18l2 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 13.5a3.5 3.5 0 0 0 7 0 3.5 3.5 0 0 0 7 0 3.5 3.5 0 0 0 7 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 14v11.5h18V14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <rect x="13.5" y="18" width="5" height="7.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
