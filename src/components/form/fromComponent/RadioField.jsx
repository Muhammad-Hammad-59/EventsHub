const RadioField = ({ id, label, checked, ...props }) => {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group">
      <input
        type="radio"
        id={id}
        checked={checked}
        className="w-5 h-5 text-accent border-2 border-borderColor focus:ring-2 focus:ring-accent focus:ring-offset-0 transition-all duration-200 cursor-pointer accent-accent"
        {...props}
      />
      <span className="text-sm font-medium text-textSecondary group-hover:text-textPrimary transition-colors duration-200">
        {label}
      </span>
    </label>
  );
};

export default RadioField;