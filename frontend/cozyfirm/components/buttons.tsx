import React from 'react'
type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  variant: 'btn_dark_green'
  onClick?: () => void;
}
const buttons = ({ type, title, variant, onClick }: ButtonProps) => {
  return (
    <button
      className={`flexCenter gap-3 rounded-full border ${variant}`}
      type={type}
      onClick={onClick}
    >
      <label className="bold-16 whitespace-nowrap">
        {title}
      </label>
    </button>
  )
}

export default buttons