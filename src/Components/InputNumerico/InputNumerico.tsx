interface InputNumericoProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: string | number;
  min?: number;
  max?: number;
  placeholder?: string;
}

export const InputNumerico: React.FC<InputNumericoProps> = ({
  label,
  value,
  onChange,
  step = "any",
  min,
  max,
  placeholder
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input 
        type="number" 
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#424874] focus:border-[#424874]"
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
      />
    </div>
  );
};