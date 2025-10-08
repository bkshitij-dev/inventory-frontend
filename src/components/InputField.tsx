interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null; // Optional error message
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm
          ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
        `}
        value={value}
        onChange={onChange}
      />
      {/* Display error message if present */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;