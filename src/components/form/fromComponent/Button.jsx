const Button = ({ children, variant = "primary", type = "button", onClick, disabled = false, className = "", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "px-6 py-3 text-white bg-gradient-to-r from-accent to-accent/80 hover:shadow-lg hover:shadow-accent/30 shadow-md shadow-accent/20 focus:ring-accent",
    secondary: "px-6 py-3 text-textPrimary bg-backgroundSecondary border border-borderColor hover:bg-background hover:border-accent/30 focus:ring-accent",
    danger: "px-6 py-3 text-white bg-red-500 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 shadow-md shadow-red-500/10 focus:ring-red-500",
    success: "px-6 py-3 text-white bg-green-500 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30 shadow-md shadow-green-500/10 focus:ring-green-500",
    ghost: "px-4 py-2 text-accent hover:bg-accent/10 focus:ring-accent"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
  