const FormSection = ({ title, children, description }) => {
  return (
    <div className="bg-gradient-to-br from-background to-backgroundSecondary p-7 rounded-xl border border-borderColor hover:border-accent/20 transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-textPrimary mb-1">{title}</h2>
        {description && (
          <p className="text-sm text-textMuted">{description}</p>
        )}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection;