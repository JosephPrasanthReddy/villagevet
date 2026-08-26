// Soft organic blob shape used as a decorative background accent behind
// imagery and section corners, echoing the rounded leaf forms in the
// VillageVet logo. Purely decorative — aria-hidden.
export default function OrganicBlob({ className = '', color = '#8B451F' }) {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        fill={color}
        d="M389 78c48 41 74 108 68 172-6 64-44 122-98 160-54 38-124 55-186 35-62-19-115-72-135-133-20-61-8-129 30-179 38-51 104-84 168-96 64-13 105-1 153 41z"
      />
    </svg>
  )
}
