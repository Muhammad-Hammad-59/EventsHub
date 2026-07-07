const SelectField = ({ label, id, options, error, required = false, ...props }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-textPrimary mb-2.5"
      >
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        className={`w-full px-4 py-2.5 border rounded-lg shadow-sm text-textPrimary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 appearance-none bg-white ${
          error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-borderColor hover:border-borderColor/70 focus:ring-accent focus:border-accent'
        }`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;