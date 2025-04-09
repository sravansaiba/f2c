import React, { useState } from "react";
import { Label } from "@/modules/ui/components/label";
import countriesData from "world-countries";
import Select from "react-select";

interface CountryFieldProps {
  id: string;
  label: string;
  stylingOptions: any;
  required?: boolean;
  name?: string;
  value?: string; // Optional: Can be used to set an initial value
  onChange?: (value: string) => void; // Optional: Callback for external updates
}

interface CountryOption {
  label: string;
  value: string;
  code: string;
  flag: string;
}

export function CountryField({
  id,
  label,
  stylingOptions,
  required = false,
  name = id,
  value: initialValue = "", // Default to empty string if no value is provided
  onChange = () => {}, // Default to no-op if no onChange is provided
}: CountryFieldProps) {
  // Internal state to manage the selected value
  const [selectedValue, setSelectedValue] = useState(initialValue);

  // Get country list with flags
  const countries: CountryOption[] = countriesData.map((country) => ({
    label: country.name.common,
    value: country.name.common,
    code: country.cca2,
    flag: `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`, // Image URL for flag
  }));

  // Handle selection change
  const handleSelectChange = (selectedOption: CountryOption | null) => {
    const newValue = selectedOption ? selectedOption.value : "";
    setSelectedValue(newValue); // Update internal state
    onChange(newValue); // Notify parent if onChange is provided
  };

  return (
    <div className="mb-4">
      {/* Label */}
      <Label
        htmlFor={id}
        className="block text-sm font-medium mb-1"
        style={{
          color: stylingOptions.textColor || "#000000",
          fontSize: stylingOptions.labelFontSize || "14px",
        }}
      >
        {label}
      </Label>

      {/* Country Select Dropdown */}
      <Select
        id={id}
        name={name}
        value={countries.find((c) => c.value === selectedValue) || null} // Use internal state
        onChange={handleSelectChange} // Handle selection internally
        options={countries}
        formatOptionLabel={(country) => (
          <div className="flex items-center">
            <img
              src={country.flag}
              alt={country.label}
              className="w-5 h-4 mr-2 rounded-sm"
            />
            {country.label}
          </div>
        )}
        styles={{
          control: (base) => ({
            ...base,
            width: "100%",
            height: "40px",
            fontFamily: stylingOptions.fontFamily || "Arial",
            fontSize: stylingOptions.fontSize || "16px",
            color: stylingOptions.textColor || "#000000",
            backgroundColor: stylingOptions.boxColor || "#ffffff",
            border: `1px solid ${stylingOptions.borderColor || "#d1d5db"}`,
            borderRadius: stylingOptions.borderRadius || "6px",
            padding: "0 8px",
            display: "flex",
            alignItems: "center",
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "0px",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            padding: "4px",
          }),
          indicatorsContainer: (base) => ({
            ...base,
            height: "40px",
          }),
        }}
      />
    </div>
  );
}