export function Logo({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} role="img">
      <rect x="2" y="2" width="60" height="60" rx="14" fill="#0055A4" />
      <path d="M14 42c8 8 28 8 36 0" stroke="#F9FBFF" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M20 34l8-12 8 9 8-15" stroke="#F9FBFF" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="47" cy="19" r="5" fill="#0B0B0B" />
    </svg>
  );
}
