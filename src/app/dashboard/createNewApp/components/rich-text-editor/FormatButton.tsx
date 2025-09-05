import React from "react"

interface FormatButtonProps {
  icon: string
  alt: string
  onClick: () => void
  isActive?: boolean
}

const FormatButton: React.FC<FormatButtonProps> = ({
  icon,
  alt,
  onClick,
  isActive = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded ${isActive ? "bg-blue-100" : ""}`}
    aria-label={alt}
    tabIndex={0}
  >
    <img src={icon} alt={alt} width={20} height={20} />
  </button>
)

export default FormatButton