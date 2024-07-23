import React from 'react'
type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  variant: 'btn_dark_green'
}
const buttons = ({ type, title, variant }: ButtonProps) => {
  return (
    <button
      className={`flexCenter gap-3 rounded-full border ${variant}`}
      type={type}
    >
      <label className="bold-16 whitespace-nowrap">
        {title}
      </label>
    </button>
  )
}

export default buttons