export function Button({ children, className, variant = "default", ...props }) {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition";
    const variants = {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      outline: "border border-blue-500 text-blue-500 hover:bg-blue-100"
    };
  
    return (
      <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
  