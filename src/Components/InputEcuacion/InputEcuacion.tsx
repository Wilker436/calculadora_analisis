interface InputEcuacionProps {
  ecuacion: string;
  setEcuacion: (ecuacion: string) => void;
  errorEcuacion: string;
  onProbarEcuacion: () => void;
  label?: string;
  placeholder?: string;
}

export const InputEcuacion: React.FC<InputEcuacionProps> = ({
  ecuacion,
  setEcuacion,
  errorEcuacion,
  onProbarEcuacion,
  label = "Ecuación f(x):",
  placeholder = "x^2 - 4"
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex space-x-2">
        <input 
          type="text" 
          value={ecuacion}
          onChange={(e) => setEcuacion(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#424874] focus:border-[#424874]"
          placeholder={placeholder}
        />
        <button 
          onClick={onProbarEcuacion}
          className="px-4 py-2 bg-[#A6B1E1] text-[#424874] rounded-md hover:bg-[#8690BD] transition-colors"
          type="button"
        >
          Probar
        </button>
      </div>
      
      {errorEcuacion && (
        <p className="mt-1 text-sm text-[#424874]">{errorEcuacion}</p>
      )}
      
      <small className="text-gray-500">
        Usa 'x' como variable. Ejemplos: x^2 - 4, sin(x) - x, exp(x) - 2
      </small>
    </div>
  );
};