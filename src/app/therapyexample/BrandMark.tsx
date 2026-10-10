type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 52 52"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="26" cy="26" r="22" stroke="currentColor" strokeOpacity=".16" />
      <path
        d="M13.5 32.2c3.8-5.2 7.1-7.6 11.5-7.6 5.4 0 7 5.3 12.7 5.3 2.2 0 4.3-.8 6.3-2.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.65"
      />
      <path
        d="M13.7 25.1c3.7-4.8 7.3-7.1 11.4-7.1 5.1 0 7.6 4.4 12.1 4.4 2.3 0 4.5-.9 6.4-2.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.65"
      />
      <path
        d="M14.2 39c3.6-4.4 7.1-6.6 11.4-6.6 4.6 0 7 3.4 11.2 4.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.65"
      />
      <circle cx="15.8" cy="14.9" fill="#B77C54" r="2.4" />
    </svg>
  );
}
