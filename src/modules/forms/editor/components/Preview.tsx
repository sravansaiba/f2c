import React, { useMemo } from 'react';
import { renderFieldComponent } from "./fieldRenderer";
import { Field } from "./types";

interface PreviewProps {
  fields: Field[];
  stylingOptions: any;
}

export const Preview = ({ fields, stylingOptions }: PreviewProps) => {

  const defaultStylingOptions = {
    backgroundColor: "#ffffff",
    buttonColor: "#007bff",
    buttonTextColor: "#ffffff",
    backgroundImage: null, 
    gradientFrom: "#ffffff", 
    gradientVia: "#ffffff", 
    gradientTo: "#ffffff", 
    gradientDirection: "to top", 
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    alert("Form data submitted successfully");
  };

 
  const resolvedStylingOptions = { ...defaultStylingOptions, ...stylingOptions };


  const { groupedFields, rowOrder } = useMemo(() => {
    const groups: Record<string, Field[]> = {};
    const rowPositions: Record<string, number> = {};

   
    fields.forEach((field: Field, index) => {
      const rowId = field.rowId || `no-row-${field.id}`;
      if (rowPositions[rowId] === undefined) {
        rowPositions[rowId] = index;
      }
    });

    
    fields.forEach((field: Field) => {
      const rowId = field.rowId || `no-row-${field.id}`;
      if (!groups[rowId]) {
        groups[rowId] = [];
      }
      groups[rowId].push(field);
    });

    
    Object.keys(groups).forEach(rowId => {
      groups[rowId].sort((a: Field, b: Field) => (a.order || 0) - (b.order || 0));
    });

   
    const sortedRowIds = Object.keys(groups).sort((a, b) =>
      (rowPositions[a] || 0) - (rowPositions[b] || 0)
    );

    return {
      groupedFields: groups,
      rowOrder: sortedRowIds
    };
  }, [fields]);

 
  if (fields.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full border-l border-slate-200 bg-slate-100 shadow-inner">
        <h1 className="text-4xl text-slate-900 italic animate-pulse">No Fields Added Yet</h1>
      </div>
    );
  }

  return (
    <aside
      className="flex-1 h-screen py-10 p-3 overflow-y-auto flex-shrink-0 border-l border-slate-200 bg-slate-100 shadow-inner flex flex-col items-center">
      <h3 className="font-semibold text-4xl text-center mb-6 px-4">Preview</h3>

      <form
        onSubmit={handleSubmit}
        style={{
          ...(resolvedStylingOptions.backgroundColor !== defaultStylingOptions.backgroundColor
            ? {
                backgroundColor: resolvedStylingOptions.backgroundColor,
              }
            : resolvedStylingOptions.backgroundImage
            ? {
                backgroundImage: `url(${resolvedStylingOptions.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : resolvedStylingOptions.gradientFrom || resolvedStylingOptions.gradientTo
            ? {
                backgroundImage: `linear-gradient(${resolvedStylingOptions.gradientDirection}, ${resolvedStylingOptions.gradientFrom}, ${resolvedStylingOptions.gradientVia}, ${resolvedStylingOptions.gradientTo})`,
              }
            : {}),
        }}
        className="max-w-lg px-8 py-10 mb-10 shadow-md p-5 rounded-3xl w-full"
      >
        <div>
          {rowOrder.map(rowId => (
            <div key={rowId} className="flex space-x-4 mb-4">
              {groupedFields[rowId].map((field: Field) => (
                <div key={field.id} className="flex-1">
                  {renderFieldComponent(field, resolvedStylingOptions)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 w-full py-2 rounded-md transition duration-300 ease-in-out"
          style={{
            backgroundColor: resolvedStylingOptions.buttonColor,
            color: resolvedStylingOptions.buttonTextColor,
          }}
        >
          Submit
        </button>
      </form>
    </aside>
  );
};


