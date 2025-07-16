export default function CryptoTrackerIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="currentColor"
      {...props}
    >
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M16 40 L28 28 L36 36 L48 24"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 24 L48 36"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <text x="20" y="20" fontSize="12" fontWeight="bold" fill="currentColor">
        $
      </text>
    </svg>
  );
}
