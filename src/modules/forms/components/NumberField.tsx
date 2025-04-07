import { Input } from "@/modules/ui/components/input";
import { Label } from "@/modules/ui/components/label";

interface NumberFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  stylingOptions: any; // Add stylingOptions as a prop
  required?: boolean;
  name?: string;
  value?: string | number;
  onChange?: (value: string) => void;
}

export function NumberField({
  id,
  label,
  placeholder,
  stylingOptions,
  required = false,
  name = id,
  value = "",
  onChange = () => {},
}: NumberFieldProps) {
  return (
    <div className="mb-4">
      {/* Label */}
      <Label
        htmlFor={id}
        className="block text-sm font-medium mb-1"
        style={{
          color: stylingOptions.textColor || "#000000",
          fontSize: stylingOptions.labelFontSize || "14px", // Use labelFontSize
          fontFamily: stylingOptions.fontFamily || "Arial",
        }}
      >
        {label}
      </Label>

      {/* Input */}
      <Input
        id={id}
        type="number"
        placeholder={placeholder || "Enter number..."}
        onChange={(e) => onChange(e.target.value)} // Handle changes in the number input
        required={required}
        name={name}
        className="w-full rounded-md shadow-sm focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
        style={{
          fontSize: stylingOptions.fontSize || "16px",
          color: stylingOptions.textColor || "#000000",
          border: `1px solid ${stylingOptions.borderColor || "#d1d5db"}`,
          padding: stylingOptions.padding || "8px",
          borderRadius: stylingOptions.borderRadius || "6px",
        }}
      />
    </div>
  );
}