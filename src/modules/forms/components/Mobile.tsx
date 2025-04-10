import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Label } from "@/modules/ui/components/label";

interface MobileFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  stylingOptions?: any;
  required?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function MobileField({
  id,
  label,
  placeholder,
  stylingOptions = {},
  required = false,
  name = id,
  value = "",
  onChange = () => {},
}: MobileFieldProps) {
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

      {/* Phone Input Field */}
      <div className="relative">
        <PhoneInput
          country={"in"} 
          value={value}
          onChange={(phone) => onChange(phone)}
          inputProps={{
            name,
            required,
            id,
          }}
          placeholder={placeholder || "Enter your mobile number"}
          containerStyle={{
            width: "100%", 
          }}
          inputStyle={{
            width: "100%",
            height: "40px",
            fontFamily: stylingOptions.fontFamily || "Arial",
            fontSize: stylingOptions.fontSize || "16px",
            color: stylingOptions.textColor || "#000000",
            backgroundColor: stylingOptions.backgroundColor || "#ffffff",
            border: `1px solid ${stylingOptions.borderColor || "#d1d5db"}`,
            padding: stylingOptions.padding || "8px",
            borderRadius: stylingOptions.borderRadius || "6px",
            paddingLeft: "50px", 
          }}
          buttonStyle={{
            height: "40px",
            borderRight: `1px solid ${stylingOptions.borderColor || "#d1d5db"}`,
          }}
        />
      </div>
    </div>
  );
}
