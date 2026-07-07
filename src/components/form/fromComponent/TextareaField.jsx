const TextareaField = ({ label, id, error, required = false, rows = 4, ...props }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-textPrimary mb-2.5"
      >
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        className={`w-full px-4 py-2.5 border rounded-lg shadow-sm text-textPrimary placeholder-textMuted resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
          error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-borderColor hover:border-borderColor/70 focus:ring-accent focus:border-accent'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
};

export default TextareaField;