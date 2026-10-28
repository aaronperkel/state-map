type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowRight({ className = "icon" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUp({ className = "icon" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20V5" />
      <path d="M6 11l6-6 6 6" />
    </svg>
  );
}

export function Close({ className = "icon" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function Pencil({ className = "icon" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20l4.5-1 10-10-3.5-3.5-10 10z" />
      <path d="M13.5 7l3.5 3.5" />
    </svg>
  );
}
