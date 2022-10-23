import React from "react"

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const AnchorButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <button
      ref={ref}
      className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
      {...props}
    >
      {props.children}
    </button>
  )
);