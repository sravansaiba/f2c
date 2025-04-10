import { Input } from "@/modules/ui/components/input";
import { Label } from "@/modules/ui/components/label";

interface DateFieldProps {
  id: string;
  label: string;
  stylingOptions: any; 
  required?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function DateField({
  id,
  label,
  stylingOptions,
  required = false,
  name = id,
  value = "",
  onChange = () => {},
}: DateFieldProps) {
  return (
    <div className="mb-4">
      {/* Label */}
      <Label
        htmlFor={id}
        className="block text-sm font-medium mb-1"
        style={{
          color: stylingOptions.textColor || "#000000",
          fontSize: stylingOptions.labelFontSize || "14px", 
          fontFamily: stylingOptions.fontFamily || "Arial",
        }}
      >
        {label}
      </Label>

      {/* Input */}
      <Input
        id={id}
        type="date"
        name={name}
        onChange={(e) => onChange(e.target.value)} 
        required={required}
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