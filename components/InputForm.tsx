interface InputProps {
  title: string;
  type: string;
  handleChange: any;
  value: string;
  placeholder: string;
  required?: boolean;
}

function InputForm({
  title,
  type,
  handleChange,
  value,
  placeholder,
  required = false,
}: InputProps) {
  return (
    <div className="grid gap-1.5">
      <label
        className="text-lg font-medium text-gray-700"
        htmlFor={title.toLowerCase()}
      >
        {title}
      </label>
      <input
        required={required}
        name={title.toLowerCase()}
        onChange={handleChange}
        id={title}
        placeholder={placeholder}
        type={type}
        value={value}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

export default InputForm;
