const Button = ({ children, variant = "primary", type = "button", onClick, className = "", ...props }) => {
    const baseClasses = "inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
      primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500",
      danger: "border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
      success: "border-transparent text-white bg-green-600 hover:bg-green-700 focus:ring-green-500"
    };
    
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  