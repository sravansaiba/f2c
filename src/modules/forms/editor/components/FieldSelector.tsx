// import { GripVertical, Type, Hash, Calendar, CheckSquare, List, Disc, Mail, Phone, Globe, AlignLeft, Heading } from "lucide-react";

// interface FieldSelectorProps {
//   fieldTypes: { type: string; label: string }[];
//   onDragStart: (type: string) => void;
// }

// // Function to get appropriate icon based on field type
// const getFieldIcon = (type: string) => {
//   switch (type) {
//     case "text":
//       return <Type size={18} className="text-blue-500" />;
//     case "number":
//       return <Hash size={18} className="text-green-500" />;
//     case "date":
//       return <Calendar size={18} className="text-purple-500" />;
//     case "checkbox":
//       return <CheckSquare size={18} className="text-red-500" />;
//     case "dropdown":
//       return <List size={18} className="text-orange-500" />;
//     case "radio":
//       return <Disc size={18} className="text-pink-500" />;
//     case "email":
//       return <Mail size={18} className="text-teal-500" />; 
//     case "tel":
//       return <Phone size={18} className="text-indigo-500" />; 
//     case "country":
//       return <Globe size={18} className="text-yellow-500" />; 
//     case "description":
//       return <AlignLeft size={18} className="text-cyan-500" />; 
//     case "heading":
//       return <Heading size={18} className="text-violet-500" />; 
//     default:
//       return <GripVertical size={18} className="text-gray-500" />; 
//   }
// };

// export const FieldSelector = ({ fieldTypes, onDragStart }: FieldSelectorProps) => {
//   return (
//     <aside className="fixed top-20 bottom-0 left-0 w-64 bg-black/10 shadow-md border-r border-gray-200 p-5 overflow-y-auto">
//       <h3 className=" text-xl font-semibold text-black ">Add Fields</h3>
//       <hr className="w-full border-t-2 border-black my-4" />
//       <div className="space-y-3 px-auto">
//         {fieldTypes.map((field) => (
//           <button
//             key={field.type}
//             draggable
//             onDragStart={(e) => {
//               e.dataTransfer.setData("text/plain", field.type);
//               onDragStart(field.type);
//             }}
//             aria-label={`Drag to add ${field.label}`}
//             className="flex items-center justify-between space-x-3 w-full rounded-lg bg-gray-100 px-4 py-3 cursor-grab 
//                        hover:bg-gray-200 shadow-sm border border-black border-b-4  hover:translate-x-1 hover:-translate-y-1 
//                        transition-transform duration-200 ease-in-out"
//           >
            
//             <span className="text-gray-700 font-medium">{field.label}</span>
//             <span>{getFieldIcon(field.type)}</span>
//           </button>
//         ))}
//       </div>
//     </aside>
//   );
// };


// import { GripVertical, Type, Hash, Calendar, CheckSquare, List, Disc, Mail, Phone, Globe, AlignLeft, Heading, Search } from "lucide-react";
// import { useState, useEffect } from "react";

// interface FieldType {
//   type: string;
//   label: string;
//   category: string;
// }

// // Field Categories with category added to each field
// const fieldCategories: any = {
//   basic: [
//     { type: "text", label: "Text Input", category: "basic" },
//     { type: "number", label: "Number Input", category: "basic" },
//     { type: "date", label: "Date Picker", category: "basic" },
//     { type: "email", label: "Email Input", category: "basic" },
//     { type: "tel", label: "Phone Input", category: "basic" },
//     { type: "text", label: "Text Input", category: "basic" },
//     { type: "number", label: "Number Input", category: "basic" },
//     { type: "date", label: "Date Picker", category: "basic" },
//     { type: "email", label: "Email Input", category: "basic" },
//     { type: "tel", label: "Phone Input", category: "basic" },
//   ],
//   moderate: [
//     { type: "checkbox", label: "Checkbox", category: "moderate" },
//     { type: "radio", label: "Radio Buttons", category: "moderate" },
//     { type: "dropdown", label: "Dropdown", category: "moderate" },
//     { type: "country", label: "Country Input", category: "moderate" },
//   ],
//   advanced: [
//     { type: "description", label: "Description Input", category: "advanced" },
//     { type: "heading", label: "Heading Input", category: "advanced" },
//   ],
// };

// // Get all fields from all categories
// const getAllFields = () => {
//   return Object.values(fieldCategories).flat();
// };

// // Function to get appropriate icon based on field type
// const getFieldIcon = (type: string) => {
//   switch (type) {
//     case "text":
//       return <Type size={18} className="text-blue-500" />;
//     case "number":
//       return <Hash size={18} className="text-green-500" />;
//     case "date":
//       return <Calendar size={18} className="text-purple-500" />;
//     case "checkbox":
//       return <CheckSquare size={18} className="text-red-500" />;
//     case "dropdown":
//       return <List size={18} className="text-orange-500" />;
//     case "radio":
//       return <Disc size={18} className="text-pink-500" />;
//     case "email":
//       return <Mail size={18} className="text-teal-500" />;
//     case "tel":
//       return <Phone size={18} className="text-indigo-500" />;
//     case "country":
//       return <Globe size={18} className="text-yellow-500" />;
//     case "description":
//       return <AlignLeft size={18} className="text-cyan-500" />;
//     case "heading":
//       return <Heading size={18} className="text-violet-500" />;
//     default:
//       return <GripVertical size={18} className="text-gray-500" />;
//   }
// };

// interface FieldSelectorProps {
//   onDragStart: (type: string) => void;
// }

// export const FieldSelector = ({ onDragStart }: FieldSelectorProps) => {
//   // State to track which category is active
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   // State for search query
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   // State for filtered fields across all categories
//   const [filteredFields, setFilteredFields] = useState<FieldType[]>([]);
//   // State to track if search is active
//   const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

//   // Function to toggle categories
//   const toggleCategory = (category: string) => {
//     if (searchQuery) {
//       setSearchQuery("");
//       setIsSearchActive(false);
//     }
//     setActiveCategory((prev) => (prev === category ? null : category));
//   };

//   // Update filtered fields when search query changes
//   useEffect(() => {
//     if (searchQuery) {
//       setIsSearchActive(true);
//       const allFields = getAllFields() as FieldType[];
//       const filtered = allFields.filter((field) =>
//         field.label.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredFields(filtered);
//     } else {
//       setIsSearchActive(false);
//       setFilteredFields([]);
//     }
//   }, [searchQuery]);

//   return (
//     <aside className="fixed top-20 bottom-0 left-0 w-64 bg-black/10 shadow-md border-r border-gray-200 p-5 overflow-y-auto">
//       {/* Title */}
//       <h3 className="text-xl font-semibold text-black mb-4">Add Fields</h3>
//       <hr className="w-full border-t-2 border-black my-4" />

//       {/* Search Bar */}
//       <div className="relative mb-4">
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//           <Search size={16} className="text-gray-500" />
//         </div>
//         <input
//           type="text"
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//           placeholder="Search fields..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Search Results */}
//       {isSearchActive && (
//         <div className="mb-4 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
//           <h4 className="text-sm font-medium text-gray-700 mb-2">Search Results</h4>
//           {filteredFields.length > 0 ? (
//             <div className="grid grid-cols-2 gap-3">
//               {filteredFields.map((field) => (
//                 <button
//                   key={field.type}
//                   draggable
//                   onDragStart={(e) => {
//                     e.dataTransfer.setData("text/plain", field.type);
//                     onDragStart(field.type);
//                   }}
//                   aria-label={`Drag to add ${field.label}`}
//                   className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out cursor-grab"
//                 >
//                   <span className="mb-2">{getFieldIcon(field.type)}</span>
//                   <span className="text-xs font-medium text-center text-gray-700 line-clamp-2">
//                     {field.label}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           ) : (
//             <p className="text-sm text-gray-500 text-center py-2">No matching fields found</p>
//           )}
//         </div>
//       )}

//       {!isSearchActive && (
//         <div className="space-y-2">
//           {/* Basic Category */}
//           <div className="mb-2">
//             <button
//               onClick={() => toggleCategory("basic")}
//               className={`flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out ${
//                 activeCategory === "basic" ? "border-b-4 border-black" : ""
//               }`}
//             >
//               <span className="text-sm font-medium text-gray-700">Basic HTML Elements</span>
//               <span className="text-gray-500">{activeCategory === "basic" ? "▲" : "▼"}</span>
//             </button>
            
//             {/* Display Basic Fields */}
//             {activeCategory === "basic" && (
//               <div className="mt-2 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
//                 <div className="grid grid-cols-2 gap-3">
//                   {fieldCategories.basic.map((field: any) => (
//                     <button
//                       key={field.type}
//                       draggable
//                       onDragStart={(e) => {
//                         e.dataTransfer.setData("text/plain", field.type);
//                         onDragStart(field.type);
//                       }}
//                       aria-label={`Drag to add ${field.label}`}
//                       className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out cursor-grab"
//                     >
//                       <span className="mb-2">{getFieldIcon(field.type)}</span>
//                       <span className="text-xs font-medium text-center text-gray-700 line-clamp-2">
//                         {field.label}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Moderate Category */}
//           <div className="mb-2">
//             <button
//               onClick={() => toggleCategory("moderate")}
//               className={`flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out ${
//                 activeCategory === "moderate" ? "border-b-4 border-black" : ""
//               }`}
//             >
//               <span className="text-sm font-medium text-gray-700">Moderate Elements</span>
//               <span className="text-gray-500">{activeCategory === "moderate" ? "▲" : "▼"}</span>
//             </button>
            
//             {/* Display Moderate Fields */}
//             {activeCategory === "moderate" && (
//               <div className="mt-2 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
//                 <div className="grid grid-cols-2 gap-3">
//                   {fieldCategories.moderate.map((field: any) => (
//                     <button
//                       key={field.type}
//                       draggable
//                       onDragStart={(e) => {
//                         e.dataTransfer.setData("text/plain", field.type);
//                         onDragStart(field.type);
//                       }}
//                       aria-label={`Drag to add ${field.label}`}
//                       className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out cursor-grab"
//                     >
//                       <span className="mb-2">{getFieldIcon(field.type)}</span>
//                       <span className="text-xs font-medium text-center text-gray-700 line-clamp-2">
//                         {field.label}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Advanced Category */}
//           <div className="mb-2">
//             <button
//               onClick={() => toggleCategory("advanced")}
//               className={`flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out ${
//                 activeCategory === "advanced" ? "border-b-4 border-black" : ""
//               }`}
//             >
//               <span className="text-sm font-medium text-gray-700">Advanced Elements</span>
//               <span className="text-gray-500">{activeCategory === "advanced" ? "▲" : "▼"}</span>
//             </button>
            
//             {/* Display Advanced Fields */}
//             {activeCategory === "advanced" && (
//               <div className="mt-2 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
//                 <div className="grid grid-cols-2 gap-3">
//                   {fieldCategories.advanced.map((field: any) => (
//                     <button
//                       key={field.type}
//                       draggable
//                       onDragStart={(e) => {
//                         e.dataTransfer.setData("text/plain", field.type);
//                         onDragStart(field.type);
//                       }}
//                       aria-label={`Drag to add ${field.label}`}
//                       className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out cursor-grab"
//                     >
//                       <span className="mb-2">{getFieldIcon(field.type)}</span>
//                       <span className="text-xs font-medium text-center text-gray-700 line-clamp-2">
//                         {field.label}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </aside>
//   );
// };




import { GripVertical, Type, Hash, Calendar, CheckSquare, List, Disc, Mail, Phone, Globe, AlignLeft, Heading, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

interface FieldType {
  type: string;
  label: string;
  category: string;
}

// Field Categories with category added to each field
const fieldCategories: any = {
  basic: [
    { type: "text", label: "Text Input", category: "basic" },
    { type: "number", label: "Number Input", category: "basic" },
    { type: "date", label: "Date Picker", category: "basic" },
    { type: "email", label: "Email Input", category: "basic" },
    { type: "tel", label: "Phone Input", category: "basic" },
  ],
  moderate: [
    { type: "checkbox", label: "Checkbox", category: "moderate" },
    { type: "radio", label: "Radio Buttons", category: "moderate" },
    { type: "dropdown", label: "Dropdown", category: "moderate" },
    { type: "country", label: "Country Input", category: "moderate" },
  ],
  advanced: [
    { type: "description", label: "Description Input", category: "advanced" },
    { type: "heading", label: "Heading Input", category: "advanced" },
  ],
};

// Get all fields from all categories
const getAllFields = () => {
  return Object.values(fieldCategories).flat();
};

// Function to get appropriate icon based on field type
const getFieldIcon = (type: string) => {
  switch (type) {
    case "text":
      return <Type size={18} className="text-blue-500" />;
    case "number":
      return <Hash size={18} className="text-green-500" />;
    case "date":
      return <Calendar size={18} className="text-purple-500" />;
    case "checkbox":
      return <CheckSquare size={18} className="text-red-500" />;
    case "dropdown":
      return <List size={18} className="text-orange-500" />;
    case "radio":
      return <Disc size={18} className="text-pink-500" />;
    case "email":
      return <Mail size={18} className="text-teal-500" />;
    case "tel":
      return <Phone size={18} className="text-indigo-500" />;
    case "country":
      return <Globe size={18} className="text-yellow-500" />;
    case "description":
      return <AlignLeft size={18} className="text-cyan-500" />;
    case "heading":
      return <Heading size={18} className="text-violet-500" />;
    default:
      return <GripVertical size={18} className="text-gray-500" />;
  }
};

interface FieldSelectorProps {
  onDragStart: (type: string) => void;
}

export const FieldSelector = ({ onDragStart }: FieldSelectorProps) => {
  // State to track which categories are active (using Set for multiple selections)
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  // State for search query
  const [searchQuery, setSearchQuery] = useState<string>("");
  // State for filtered fields across all categories
  const [filteredFields, setFilteredFields] = useState<FieldType[]>([]);
  // State to track if search is active
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  // Function to toggle categories (multi-select)
  const toggleCategory = (category: string) => {
    if (searchQuery) {
      setSearchQuery("");
      setIsSearchActive(false);
    }
    
    setActiveCategories(prev => {
      const newActiveCategories = new Set(prev);
      if (newActiveCategories.has(category)) {
        newActiveCategories.delete(category);
      } else {
        newActiveCategories.add(category);
      }
      return newActiveCategories;
    });
  };

  // Check if a category is active
  const isCategoryActive = (category: string): boolean => {
    return activeCategories.has(category);
  };

  // Update filtered fields when search query changes
  useEffect(() => {
    if (searchQuery) {
      setIsSearchActive(true);
      const allFields = getAllFields() as FieldType[];
      const filtered = allFields.filter((field) =>
        field.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFields(filtered);
    } else {
      setIsSearchActive(false);
      setFilteredFields([]);
    }
  }, [searchQuery]);

  return (
    <aside className="fixed top-20 bottom-0 left-0 w-72 bg-black/10 shadow-md border-r border-gray-200 p-5 overflow-y-auto">
      {/* Title */}
      <h3 className="text-xl font-semibold text-black mb-4">Add Fields</h3>
      <hr className="w-full border-t-2 border-black my-4" />

      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={16} className="text-gray-500" />
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Search fields..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Search Results */}
      {isSearchActive && (
        <div className="mb-4 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Search Results</h4>
          {filteredFields.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredFields.map((field, index) => (
                <button
                  key={`${field.type}-${index}`}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", field.type);
                    onDragStart(field.type);
                  }}
                  aria-label={`Drag to add ${field.label}`}
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out cursor-grab"
                >
                  <span className="mb-2">{getFieldIcon(field.type)}</span>
                  <span className="text-xs font-medium text-center text-gray-700 line-clamp-2">
                    {field.label}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-2">No matching fields found</p>
          )}
        </div>
      )}

      {!isSearchActive && (
        <div className="space-y-2">
          {/* Basic Category */}
          <div className="mb-2">
            <button
              onClick={() => toggleCategory("basic")}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out ${
                isCategoryActive("basic") ? "border-b-4 border-black" : ""
              }`}
            >
              <span className="text-sm font-medium text-gray-700">Basic Elements</span>
              <span className="text-gray-500">{isCategoryActive("basic") ?  <ChevronUp size={25}/> : <ChevronDown size={25}/>}</span>
            </button>
            
            {/* Display Basic Fields */}
            {isCategoryActive("basic") && (
              <div className="mt-2 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <div className="grid grid-cols-2 gap-3">
                  {fieldCategories.basic.map((field: any, index: number) => (
                    <button
                      key={`${field.type}-${index}`}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", field.type);
                        onDragStart(field.type);
                      }}
                      aria-label={`Drag to add ${field.label}`}
                      className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out cursor-grab"
                    >
                      <span className="mb-2">{getFieldIcon(field.type)}</span>
                      <span className="text-xs font-medium text-center text-gray-700 line-clamp-2">
                        {field.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Moderate Category */}
          <div className="mb-2">
            <button
              onClick={() => toggleCategory("moderate")}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out ${
                isCategoryActive("moderate") ? "border-b-4 border-black" : ""
              }`}
            >
              <span className="text-sm font-medium text-gray-700">Intermediate Elements</span>
              <span className="text-gray-500">{isCategoryActive("moderate") ? <ChevronUp size={25}/> : <ChevronDown size={25}/>}</span>
            </button>
            
            {/* Display Moderate Fields */}
            {isCategoryActive("moderate") && (
              <div className="mt-2 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <div className="grid grid-cols-2 gap-3">
                  {fieldCategories.moderate.map((field: any, index: number) => (
                    <button
                      key={`${field.type}-${index}`}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", field.type);
                        onDragStart(field.type);
                      }}
                      aria-label={`Drag to add ${field.label}`}
                      className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out cursor-grab"
                    >
                      <span className="mb-2">{getFieldIcon(field.type)}</span>
                      <span className="text-xs font-medium text-center text-gray-700 line-clamp-2">
                        {field.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Advanced Category */}
          <div className="mb-2">
            <button
              onClick={() => toggleCategory("advanced")}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out ${
                isCategoryActive("advanced") ? "border-b-4 border-black" : ""
              }`}
            >
              <span className="text-sm font-medium text-gray-700">Advanced Elements</span>
              <span className="text-gray-500">{isCategoryActive("advanced") ?  <ChevronUp size={25}/> : <ChevronDown size={25}/>}</span>
            </button>
            
            {/* Display Advanced Fields */}
            {isCategoryActive("advanced") && (
              <div className="mt-2 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <div className="grid grid-cols-2 gap-3">
                  {fieldCategories.advanced.map((field: any, index: number) => (
                    <button
                      key={`${field.type}-${index}`}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", field.type);
                        onDragStart(field.type);
                      }}
                      aria-label={`Drag to add ${field.label}`}
                      className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in-out cursor-grab"
                    >
                      <span className="mb-2">{getFieldIcon(field.type)}</span>
                      <span className="text-xs font-medium text-center text-gray-700 line-clamp-2">
                        {field.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
