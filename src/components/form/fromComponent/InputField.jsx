const InputField = ({ label, id,type="text", error, required = false, ...props }) => {

  const { value, ...inputProps } = props;
 
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          id={id}
          type={type}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          {...inputProps}
          onChange={props.onChange}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  };
  
  export default InputField;