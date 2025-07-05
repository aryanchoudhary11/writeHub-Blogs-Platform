function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition duration-200 ease-in-out
        ${bgColor} ${textColor}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-90"}
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
