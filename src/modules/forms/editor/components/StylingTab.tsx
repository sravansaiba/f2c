// import React from "react";

// interface StylingTabProps {
//   stylingOptions: any;
//   setStylingOptions: (options: any) => void;
// }

// export const StylingTab = ({ stylingOptions, setStylingOptions }: StylingTabProps) => {
//   const handleInputChange = (key: string, value: string) => {
//     setStylingOptions((prev: any) => ({ ...prev, [key]: value }));
//   };

//   return (
//     <div className="p-6 space-y-6 w-full overflow-y-auto "> {/* Centered layout with max width */}
//       {/* Section: Text Styles */}
//       <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
//         <h4 className="text-lg font-semibold mb-4">Text Styles</h4>
//         <div className="space-y-4">
//           {/* Font Family */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Font Family</label>
//             <select
//               value={stylingOptions.fontFamily}
//               onChange={(e) => handleInputChange("fontFamily", e.target.value)}
//               className="mt-1 block w-full border rounded-md shadow-sm"
//             >
//               <option value="Arial">Arial</option>
//               <option value="Roboto">Roboto</option>
//               <option value="Georgia">Georgia</option>
//             </select>
//           </div>

//           {/* Font Size */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Font Size</label>
//             <input
//               type="range"
//               min="12"
//               max="24"
//               step="1"
//               value={stylingOptions.fontSize.replace("px", "")}
//               onChange={(e) => handleInputChange("fontSize", `${e.target.value}px`)}
//               className="mt-1 block w-full"
//             />
//             <span className="text-xs text-slate-500">{stylingOptions.fontSize}</span>
//           </div>

//           {/* Label Font Size */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Label Font Size</label>
//             <input
//               type="range"
//               min="10"
//               max="28"
//               step="1"
//               value={stylingOptions.labelFontSize.replace("px", "")}
//               onChange={(e) => handleInputChange("labelFontSize", `${e.target.value}px`)}
//               className="mt-1 block w-full"
//             />
//             <span className="text-xs text-slate-500">{stylingOptions.labelFontSize}</span>
//           </div>

//           {/* Heading Font Size */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Heading Font Size</label>
//             <input
//               type="range"
//               min="10"
//               max="38"
//               step="1"
//               value={stylingOptions.headingSize.replace("px", "")}
//               onChange={(e) => handleInputChange("headingSize", `${e.target.value}px`)}
//               className="mt-1 block w-full"
//             />
//             <span className="text-xs text-slate-500">{stylingOptions.headingSize}</span>
//           </div>

//           {/* Text Color */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Text Color</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="color"
//                 value={stylingOptions.textColor}
//                 onChange={(e) => handleInputChange("textColor", e.target.value)}
//                 className="mt-1"
//               />
//               <span>{stylingOptions.textColor}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section: Background & Layout */}
//       <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
//         <h4 className="text-lg font-semibold mb-4">Background & Layout</h4>
//         <div className="space-y-4">
//           {/* Background Color */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Background Color</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="color"
//                 value={stylingOptions.backgroundColor}
//                 onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
//                 className="mt-1"
//               />
//               <span>{stylingOptions.backgroundColor}</span>
//             </div>
//           </div>

//           {/* Padding */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Padding</label>
//             <input
//               type="range"
//               min="0"
//               max="20"
//               step="1"
//               value={stylingOptions.padding.replace("px", "")}
//               onChange={(e) => handleInputChange("padding", `${e.target.value}px`)}
//               className="mt-1 block w-full"
//             />
//             <span className="text-xs text-slate-500">{stylingOptions.padding}</span>
//           </div>

//           {/* Border Radius */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Border Radius</label>
//             <input
//               type="range"
//               min="0"
//               max="20"
//               step="1"
//               value={stylingOptions.borderRadius.replace("px", "")}
//               onChange={(e) => handleInputChange("borderRadius", `${e.target.value}px`)}
//               className="mt-1 block w-full"
//             />
//             <span className="text-xs text-slate-500">{stylingOptions.borderRadius}</span>
//           </div>

//           {/* Border Color */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Border Color</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="color"
//                 value={stylingOptions.borderColor}
//                 onChange={(e) => handleInputChange("borderColor", e.target.value)}
//                 className="mt-1"
//               />
//               <span>{stylingOptions.borderColor}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section: Button Styles */}
//       <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
//         <h4 className="text-lg font-semibold mb-4">Button Styles</h4>
//         <div className="space-y-4">
//           {/* Button Color */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Button Color</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="color"
//                 value={stylingOptions.buttonColor}
//                 onChange={(e) => handleInputChange("buttonColor", e.target.value)}
//                 className="mt-1"
//               />
//               <span>{stylingOptions.buttonColor}</span>
//             </div>
//           </div>

//           {/* Button Text Color */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Button Text Color</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="color"
//                 value={stylingOptions.buttonTextColor}
//                 onChange={(e) => handleInputChange("buttonTextColor", e.target.value)}
//                 className="mt-1"
//               />
//               <span>{stylingOptions.buttonTextColor}</span>
//             </div>
//           </div>
//         </div>
//       </div>

    
//     </div>
//   );
// };








// import React, { useState, useRef } from "react";
// import { Trash2 } from "lucide-react";

// interface StylingTabProps {
//   stylingOptions: any;
//   setStylingOptions: (options: any) => void;
// }

// export const StylingTab = ({ stylingOptions, setStylingOptions }: StylingTabProps) => {
//   const [uploadedImages, setUploadedImages] = useState<string[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const gradientDirections = [
//     "to right",
//     "to left",
//     "to top",
//     "to bottom",
    
//   ];

//   // Function to handle input changes
//   const handleInputChange = (key: string, value: string | null) => {
//     setStylingOptions((prev: any) => ({ ...prev, [key]: value }));
//   };

//   // Handle image upload
//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (typeof reader.result === "string") {
//           setUploadedImages((prev) => [...prev, reader.result]);
//           handleInputChange("backgroundImage", reader.result);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Delete an uploaded image
//   const handleDeleteImage = (image: string) => {
//     setUploadedImages((prev) => prev.filter((img) => img !== image));

//     // If the deleted image was the selected background, clear it
//     if (stylingOptions.backgroundImage === image) {
//       handleInputChange("backgroundImage", null);
//     }

//     // Reset file input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""; // Clear the file input
//     }
//   };

//   // Reset all styling options
//   const resetStyling = () => {
//     setStylingOptions({
//       fontFamily: "Arial",
//       fontSize: "16px",
//       labelFontSize: "14px",
//       headingSize: "24px",
//       textColor: "#000000",
//       backgroundColor: "#ffffff",
//       padding: "10px",
//       borderRadius: "5px",
//       borderColor: "#cccccc",
//       buttonColor: "#007bff",
//       buttonTextColor: "#ffffff",
//       backgroundImage: null,
//       gradientFrom: "#ffffff",
//       gradientVia: "#ffffff",
//       gradientTo: "#ffffff",
//       gradientDirection: "",
//     });
//     setUploadedImages([]); // Clear uploaded images
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""; // Reset file input
//     }
//   };

//   return (
//     <div className="p-6 space-y-6 w-full overflow-y-auto">
//       {/* Section: Text Styles */}
//       <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
//         <h4 className="text-lg font-semibold mb-4">Text Styles</h4>
//         <div className="space-y-4">
//           {/* Font Family */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Font Family</label>
//             <select
//               value={stylingOptions.fontFamily}
//               onChange={(e) => handleInputChange("fontFamily", e.target.value)}
//               className="mt-1 block w-full border rounded-md shadow-sm"
//             >
//               <option value="Arial">Arial</option>
//               <option value="Roboto">Roboto</option>
//               <option value="Georgia">Georgia</option>
//             </select>
//           </div>

//           {/* Font Size */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Font Size</label>
//             <input
//               type="range"
//               min="12"
//               max="24"
//               step="1"
//               value={stylingOptions.fontSize.replace("px", "")}
//               onChange={(e) => handleInputChange("fontSize", `${e.target.value}px`)}
//               className="mt-1 block w-full"
//             />
//             <span className="text-xs text-slate-500">{stylingOptions.fontSize}</span>
//           </div>

//           {/* Label Font Size */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Label Font Size</label>
//             <input
//               type="range"
//               min="10"
//               max="28"
//               step="1"
//               value={stylingOptions.labelFontSize.replace("px", "")}
//               onChange={(e) => handleInputChange("labelFontSize", `${e.target.value}px`)}
//               className="mt-1 block w-full"
//             />
//             <span className="text-xs text-slate-500">{stylingOptions.labelFontSize}</span>
//           </div>

//           {/* Heading Font Size */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Heading Font Size</label>
//             <input
//               type="range"
//               min="10"
//               max="38"
//               step="1"
//               value={stylingOptions.headingSize.replace("px", "")}
//               onChange={(e) => handleInputChange("headingSize", `${e.target.value}px`)}
//               className="mt-1 block w-full"
//             />
//             <span className="text-xs text-slate-500">{stylingOptions.headingSize}</span>
//           </div>

//           {/* Text Color */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Text Color</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="color"
//                 value={stylingOptions.textColor}
//                 onChange={(e) => handleInputChange("textColor", e.target.value)}
//                 className="mt-1"
//               />
//               <span>{stylingOptions.textColor}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section: Background & Layout */}
//       <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
//         <h4 className="text-lg font-semibold mb-4">Background & Layout</h4>
//         <div className="space-y-4">
//           {/* Background Color */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Background Color</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="color"
//                 value={stylingOptions.backgroundColor}
//                 onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
//                 className="mt-1"
//               />
//               <span>{stylingOptions.backgroundColor}</span>
//             </div>
//           </div>

//           {/* Padding */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Padding</label>
//             <input
//               type="range"
//               min="0"
//               max="20"
//               step="1"
//               value={stylingOptions.padding.replace("px", "")}
//               onChange={(e) => handleInputChange("padding", `${e.target.value}px`)}
//               className="mt-1 block w-full"
//             />
//             <span className="text-xs text-slate-500">{stylingOptions.padding}</span>
//           </div>

//           {/* Border Radius */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Border Radius</label>
//             <input
//               type="range"
//               min="0"
//               max="20"
//               step="1"
//               value={stylingOptions.borderRadius.replace("px", "")}
//               onChange={(e) => handleInputChange("borderRadius", `${e.target.value}px`)}
//               className="mt-1 block w-full"
//             />
//             <span className="text-xs text-slate-500">{stylingOptions.borderRadius}</span>
//           </div>

//           {/* Border Color */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Border Color</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="color"
//                 value={stylingOptions.borderColor}
//                 onChange={(e) => handleInputChange("borderColor", e.target.value)}
//                 className="mt-1"
//               />
//               <span>{stylingOptions.borderColor}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section: Button Styles */}
//       <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
//         <h4 className="text-lg font-semibold mb-4">Button Styles</h4>
//         <div className="space-y-4">
//           {/* Button Color */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Button Color</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="color"
//                 value={stylingOptions.buttonColor}
//                 onChange={(e) => handleInputChange("buttonColor", e.target.value)}
//                 className="mt-1"
//               />
//               <span>{stylingOptions.buttonColor}</span>
//             </div>
//           </div>

//           {/* Button Text Color */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Button Text Color</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="color"
//                 value={stylingOptions.buttonTextColor}
//                 onChange={(e) => handleInputChange("buttonTextColor", e.target.value)}
//                 className="mt-1"
//               />
//               <span>{stylingOptions.buttonTextColor}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section: Themes */}
//       <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
//         <h4 className="text-lg font-semibold mb-4">Themes</h4>
//         <div className="space-y-4">
//           {/* Display Theme Images */}
//           <div className="flex space-x-4 overflow-x-auto">
//             {["/img1.png", "/img2.png","/img3.png","/img4.png"].map((theme, index) => (
//               <img
//                 key={index}
//                 src={theme}
//                 alt={`Theme ${index + 1}`}
//                 onClick={() => handleInputChange("backgroundImage", theme)}
//                 className={`w-20 h-20 rounded-md cursor-pointer ${
//                   stylingOptions.backgroundImage === theme ? "border-2 border-blue-500" : ""
//                 }`}
//               />
//             ))}

//             {/* Display Uploaded Images with Delete Icon */}
//             {uploadedImages.map((image, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={image}
//                   alt={`Uploaded ${index + 1}`}
//                   onClick={() => handleInputChange("backgroundImage", image)}
//                   className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
//                     stylingOptions.backgroundImage === image ? "border-2 border-blue-500" : ""
//                   }`}
//                 />
//                 <div className="absolute inset-0 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>

//                 {/* Delete Button */}
//                 <button
//                   className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent click from propagating to the image
//                     handleDeleteImage(image);
//                   }}
//                 >
//                   <Trash2 size={12} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Upload Image */}
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="mt-2"
//           />

//           {/* Delete Theme Button */}
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded"
//             onClick={() => handleInputChange("backgroundImage", null)}
//           >
//             Delete Theme
//           </button>
//         </div>
//       </div>

//       {/* Section: Gradient Colors */}
//       <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
//         <h4 className="text-lg font-semibold mb-4">Gradient Colors</h4>
//         <div className="space-y-4">
//           {/* Gradient Direction */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Gradient Direction</label>
//             <select
//               value={stylingOptions.gradientDirection}
//               onChange={(e) => handleInputChange("gradientDirection", e.target.value)}
//               className="mt-1 block w-full border rounded-md shadow-sm"
//             >
//               {gradientDirections.map((dir, index) => (
//                 <option key={index} value={dir}>
//                   {dir}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* From, Via, and To Colors */}
//           {["gradientFrom", "gradientVia", "gradientTo"].map((colorKey, index) => (
//             <div key={index}>
//               <label className="block text-sm font-medium text-slate-700">
//                 {colorKey.replace("gradient", "")} Color
//               </label>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="color"
//                   value={stylingOptions[colorKey]}
//                   onChange={(e) => handleInputChange(colorKey, e.target.value)}
//                   className="mt-1"
//                 />
//                 <span>{stylingOptions[colorKey]}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Reset All Button */}
//       <div className="flex justify-center mt-6">
//         <button
//           className="bg-gray-500 text-white px-6 py-3 rounded-lg"
//           onClick={resetStyling}
//         >
//           Reset All
//         </button>
//       </div>
//     </div>
//   );
// };


import React, { useState, useRef } from "react";
import { Trash2, Trash2Icon } from "lucide-react";

interface StylingTabProps {
  stylingOptions: any;
  setStylingOptions: (options: any) => void;
}

export const StylingTab = ({ stylingOptions, setStylingOptions }: StylingTabProps) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const gradientDirections = ["to right", "to left", "to top", "to bottom"];

  // Function to handle input changes
  const handleInputChange = (key: string, value: string | null) => {
    setStylingOptions((prev: any) => ({ ...prev, [key]: value }));
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setUploadedImages((prev) => [...prev, reader.result]);
          handleInputChange("backgroundImage", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete an uploaded image
  const handleDeleteImage = (image: string) => {
    setUploadedImages((prev) => prev.filter((img) => img !== image));
    if (stylingOptions.backgroundImage === image) {
      handleInputChange("backgroundImage", null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  // Reset all styling options
  const resetStyling = () => {
    setStylingOptions({
      fontFamily: "Arial",
      fontSize: "16px",
      labelFontSize: "14px",
      headingSize: "24px",
      textColor: "#000000",
      backgroundColor: "#ffffff",
      padding: "10px",
      borderRadius: "5px",
      borderColor: "#cccccc",
      buttonColor: "#007bff",
      buttonTextColor: "#ffffff",
      backgroundImage: null,
      gradientFrom: "#ffffff",
      gradientVia: "#ffffff",
      gradientTo: "#ffffff",
      gradientDirection: "",
    });
    setUploadedImages([]); // Clear uploaded images
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  // Delete Gradient Function
  const deleteGradient = () => {
    setStylingOptions((prev: any) => ({
      ...prev,
      gradientFrom: "#ffffff", // Default start color
      gradientVia: "#ffffff", // Default middle color
      gradientTo: "#ffffff", // Default end color
      gradientDirection: "to right", // Default direction
      backgroundImage: null, // Clear any image theme
    }));
  };


  const deleteBackgroundColor = () => {
    setStylingOptions((prev: any) => ({
      ...prev,
      backgroundColor: "#ffffff", // Default background color
      backgroundImage: null, // Clear any image theme
      gradientFrom: "#ffffff", // Reset gradient start color
      gradientVia: "#ffffff", // Reset gradient middle color
      gradientTo: "#ffffff", // Reset gradient end color
      gradientDirection: "to top", // Reset gradient direction
    }));
  };

  return (
    <div className="p-6 space-y-6 w-full overflow-y-auto">
      {/* Section: Text Styles */}
      <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
        <h4 className="text-lg font-semibold mb-4">Text Styles</h4>
        <div className="space-y-4">
          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Font Family</label>
            <select
              value={stylingOptions.fontFamily}
              onChange={(e) => handleInputChange("fontFamily", e.target.value)}
              className="mt-1 block w-full border rounded-md shadow-sm"
            >
              <option value="Arial">Arial</option>
              <option value="Roboto">Roboto</option>
              <option value="Georgia">Georgia</option>
            </select>
          </div>
          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Font Size</label>
            <input
              type="range"
              min="12"
              max="24"
              step="1"
              value={stylingOptions.fontSize.replace("px", "")}
              onChange={(e) => handleInputChange("fontSize", `${e.target.value}px`)}
              className="mt-1 block w-full"
            />
            <span className="text-xs text-slate-500">{stylingOptions.fontSize}</span>
          </div>
          {/* Label Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Label Font Size</label>
            <input
              type="range"
              min="10"
              max="28"
              step="1"
              value={stylingOptions.labelFontSize.replace("px", "")}
              onChange={(e) => handleInputChange("labelFontSize", `${e.target.value}px`)}
              className="mt-1 block w-full"
            />
            <span className="text-xs text-slate-500">{stylingOptions.labelFontSize}</span>
          </div>
          {/* Heading Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Heading Font Size</label>
            <input
              type="range"
              min="10"
              max="38"
              step="1"
              value={stylingOptions.headingSize.replace("px", "")}
              onChange={(e) => handleInputChange("headingSize", `${e.target.value}px`)}
              className="mt-1 block w-full"
            />
            <span className="text-xs text-slate-500">{stylingOptions.headingSize}</span>
          </div>
          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Text Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={stylingOptions.textColor}
                onChange={(e) => handleInputChange("textColor", e.target.value)}
                className="mt-1"
              />
              <span>{stylingOptions.textColor}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Section: Background & Layout */}
      <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
        <h4 className="text-lg font-semibold mb-4">Background & Layout</h4>
        <div className="space-y-4">
          {/* Background Color */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-slate-700">Background Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={stylingOptions.backgroundColor}
                onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                className="mt-1"
              />
              <span>{stylingOptions.backgroundColor}</span>
            </div>
                      {/* Delete Background Color Button */}
          <button
            className="bg-red-500 w-52 text-white rounded-xl px-4 py-2 mt-4"
            onClick={deleteBackgroundColor}
          >
            delete background color 
          </button>
          </div>
          {/* Padding */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Padding</label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={stylingOptions.padding.replace("px", "")}
              onChange={(e) => handleInputChange("padding", `${e.target.value}px`)}
              className="mt-1 block w-full"
            />
            <span className="text-xs text-slate-500">{stylingOptions.padding}</span>
          </div>
          {/* Border Radius */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Border Radius</label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={stylingOptions.borderRadius.replace("px", "")}
              onChange={(e) => handleInputChange("borderRadius", `${e.target.value}px`)}
              className="mt-1 block w-full"
            />
            <span className="text-xs text-slate-500">{stylingOptions.borderRadius}</span>
          </div>
          {/* Border Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Border Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={stylingOptions.borderColor}
                onChange={(e) => handleInputChange("borderColor", e.target.value)}
                className="mt-1"
              />
              <span>{stylingOptions.borderColor}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Section: Button Styles */}
      <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
        <h4 className="text-lg font-semibold mb-4">Button Styles</h4>
        <div className="space-y-4">
          {/* Button Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Button Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={stylingOptions.buttonColor}
                onChange={(e) => handleInputChange("buttonColor", e.target.value)}
                className="mt-1"
              />
              <span>{stylingOptions.buttonColor}</span>
            </div>
          </div>
          {/* Button Text Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Button Text Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={stylingOptions.buttonTextColor}
                onChange={(e) => handleInputChange("buttonTextColor", e.target.value)}
                className="mt-1"
              />
              <span>{stylingOptions.buttonTextColor}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Section: Themes */}
      <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
        <h4 className="text-lg font-semibold mb-4">Themes</h4>
        <div className="space-y-4">
          {/* Display Theme Images */}
          <div className="flex space-x-4 overflow-x-auto">
            {["/img1.png", "/img2.png", "/img3.png", "/img4.png"].map((theme, index) => (
              <img
                key={index}
                src={theme}
                alt={`Theme ${index + 1}`}
                onClick={() => handleInputChange("backgroundImage", theme)}
                className={`w-20 h-20 rounded-md cursor-pointer ${
                  stylingOptions.backgroundImage === theme ? "border-2 border-blue-500" : ""
                }`}
              />
            ))}
            {/* Display Uploaded Images with Delete Icon */}
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  onClick={() => handleInputChange("backgroundImage", image)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                    stylingOptions.backgroundImage === image ? "border-2 border-blue-500" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* Delete Button */}
                <button
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from propagating to the image
                    handleDeleteImage(image);
                  }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
          {/* Upload Image */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2"
          />
          {/* Delete Theme Button */}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleInputChange("backgroundImage", null)}
          >
            Delete Theme
          </button>
        </div>
      </div>
      {/* Section: Gradient Colors */}
      <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
        <h4 className="text-lg font-semibold mb-4">Gradient Colors</h4>
        <div className="space-y-4">
          {/* Gradient Direction */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Gradient Direction</label>
            <select
              value={stylingOptions.gradientDirection}
              onChange={(e) => handleInputChange("gradientDirection", e.target.value)}
              className="mt-1 block w-full border rounded-md shadow-sm"
            >
              {gradientDirections.map((dir, index) => (
                <option key={index} value={dir}>
                  {dir}
                </option>
              ))}
            </select>
          </div>
          {/* From, Via, and To Colors */}
          {["gradientFrom", "gradientVia", "gradientTo"].map((colorKey, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-slate-700">
                {colorKey.replace("gradient", "")} Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={stylingOptions[colorKey]}
                  onChange={(e) => handleInputChange(colorKey, e.target.value)}
                  className="mt-1"
                />
                <span>{stylingOptions[colorKey]}</span>
              </div>
            </div>
          ))}
          {/* Delete Gradient Button */}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={deleteGradient}
          >
            Delete Gradient
          </button>
        </div>
      </div>
      {/* Reset All Button */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-gray-500 text-white px-6 py-3 rounded-lg"
          onClick={resetStyling}
        >
          Reset All
        </button>
      </div>
    </div>
  );
};





