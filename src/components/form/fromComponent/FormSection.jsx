const FormSection = ({ title, children }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    );
  };
  
  export default FormSection;