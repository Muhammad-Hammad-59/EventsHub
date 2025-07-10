const RadioField = ({ id, label, checked, ...props }) => {
    return (
      <div className="flex items-center">
        <input
          type="radio"
          id={id}
          checked={checked}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          {...props}
        />
        <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
          {label}
        </label>
      </div>
    );
  };
  
  export default RadioField;