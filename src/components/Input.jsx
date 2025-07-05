import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        {...props}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg 
          text-gray-900 placeholder-gray-400 bg-white 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
          transition duration-200 ease-in-out ${className}`}
      />
    </div>
  );
});

export default Input;
