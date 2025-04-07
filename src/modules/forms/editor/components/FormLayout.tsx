// import { useState, useMemo, useRef } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragOverlay,
//   DragEndEvent,
//   DragStartEvent,
//   DragOverEvent,
//   pointerWithin,
//   rectIntersection,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
//   arrayMove,
//   useSortable,
//   verticalListSortingStrategy,
//   horizontalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { ArrowRightLeft, GripVerticalIcon, Move, Rows2, SquarePen, Trash2 } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";
// import { Field } from "./types";
// import { FieldEditor } from "./FieldEditor";

// interface FormLayoutProps {
//   fields: Field[];
//   editingFieldId: string | null;
//   setFields: React.Dispatch<React.SetStateAction<Field[]>>;
//   setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;

// }



// export const FormLayout = ({
//   fields,
//   editingFieldId,
//   setFields,
//   setEditingFieldId,
// }: FormLayoutProps) => {
//   const [activeId, setActiveId] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dropTarget, setDropTarget] = useState<{ 
//     id: string, 
//     position: 'before' | 'after' | 'inside' | 'new-row' 
//   } | null>(null);
  
//   // Reference to the main drop zone
//   const dropZoneRef = useRef<HTMLDivElement>(null);

//   // Group fields by rowId
//   const groupedFields = useMemo(() => {
//     const groups = fields.reduce((acc, field) => {
//       const rowId = field.rowId || `default-row-${field.id}`;
//       if (!acc[rowId]) acc[rowId] = [];
//       acc[rowId].push(field);
//       return acc;
//     }, {} as Record<string, Field[]>);

//     // Sort fields within each row by their order property
//     Object.keys(groups).forEach(rowId => {
//       groups[rowId].sort((a, b) => (a.order || 0) - (b.order || 0));
//     });

//     return groups;
//   }, [fields]);

//   // Dynamically derive rowIds based on groupedFields
//   const rowIds = useMemo(() => Object.keys(groupedFields), [groupedFields]);

//   // Define sensors for drag-and-drop
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 5, 
//       },
//     }),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   // Handle drag start event
//   const handleDragStart = (event: DragStartEvent) => {
//     setActiveId(event.active.id as string);
//     setIsDragging(true);
//   };

//   // Handle drag over event to show drop indicators
//   const handleDragOver = (event: DragOverEvent) => {
//     const { active, over } = event;
    
//     if (!over || !event.over?.rect) {
//       setDropTarget(null);
//       return;
//     }

//     // Skip if dragging a row
//     if (rowIds.includes(active.id as string)) {
//       return;
//     }

//     const activeField = fields.find(f => f.id === active.id);
//     if (!activeField) return;

//     // If over the main drop zone but not a specific field
//     if (over.id === 'form-layout-drop-zone') {
//       setDropTarget({ id: 'form-layout-drop-zone', position: 'new-row' });
//       return;
//     }

//     const overField = fields.find(f => f.id === over.id);
//     if (!overField) {
//       setDropTarget(null);
//       return;
//     }

//     // Get DOM elements for position calculations
//     const overElement = document.getElementById(over.id as string);
//     if (!overElement) {
//       setDropTarget(null);
//       return;
//     }

//     // Get row element (parent container)
//     const rowElement = overElement.closest('[data-row-id]');
//     if (!rowElement) {
//       setDropTarget(null);
//       return;
//     }

//     const rowRect = rowElement.getBoundingClientRect();
//     const fieldRect = overElement.getBoundingClientRect();
    
//     // Calculate pointer position relative to elements
//     const pointerX = event.over?.rect.left + (event.over?.rect.width / 2);
//     const pointerY = event.over?.rect.top + (event.over?.rect.height / 2);
    
//     // Check vertical position - if pointer is significantly below the row,
//     // indicate we're creating a new row
//     const verticalThreshold = 20; // pixels below the row to trigger new row
//     const isSignificantlyBelow = pointerY > (rowRect.bottom + verticalThreshold);
    
//     if (isSignificantlyBelow) {
//       setDropTarget({ id: over.id as string, position: 'new-row' });
//       return;
//     }
    
//     // Enhanced detection: Check if we're near the edges of the row
//     const horizontalEdgeSensitivity = 40; // pixels
//     const isNearLeftEdge = pointerX < (rowRect.left + horizontalEdgeSensitivity);
//     const isNearRightEdge = pointerX > (rowRect.right - horizontalEdgeSensitivity);
    
//     // If near edges and the field is from a different row, suggest new row
//     if ((isNearLeftEdge || isNearRightEdge) && activeField.rowId !== overField.rowId) {
//       setDropTarget({ id: over.id as string, position: 'new-row' });
//       return;
//     }
    
//     // Horizontal position within a field
//     const centerX = fieldRect.left + fieldRect.width / 2;
//     const position = pointerX < centerX ? 'before' : 'after';
    
//     setDropTarget({ id: over.id as string, position });
//   };

//   // Handle drag end event
//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
  
//     if (!over) {
//       setActiveId(null);
//       setIsDragging(false);
//       setDropTarget(null);
//       return;
//     }
  
//     // Handle row sorting
//     if (rowIds.includes(active.id as string)) {
//       if (rowIds.includes(over.id as string)) {
//         const activeIndex = rowIds.indexOf(active.id as string);
//         const overIndex = rowIds.indexOf(over.id as string);
  
//         if (activeIndex !== overIndex) {
//           const reorderedRowIds = arrayMove(rowIds, activeIndex, overIndex);
//           const rowPositionMap = rowIds.reduce((map, rowId, index) => {
//             map[rowId] = reorderedRowIds.indexOf(rowId);
//             return map;
//           }, {} as Record<string, number>);
          
//           const updatedFields = [...fields].sort((a, b) => {
//             const aRowId = a.rowId || '';
//             const bRowId = b.rowId || '';
//             if (aRowId !== bRowId) {
//               return (rowPositionMap[aRowId] || 0) - (rowPositionMap[bRowId] || 0);
//             }
//             return (a.order || 0) - (b.order || 0);
//           });
          
//           setFields(updatedFields);
//         }
//       }
//       setActiveId(null);
//       setIsDragging(false);
//       setDropTarget(null);
//       return;
//     }
  
//     // Handle field movement
//     const activeField = fields.find(f => f.id === active.id);
//     if (!activeField) {
//       setActiveId(null);
//       setIsDragging(false);
//       setDropTarget(null);
//       return;
//     }
  
//     // Check if we should create a new row based on the drop indicator
//     if (dropTarget?.position === 'new-row') {
//       const newRowId = uuidv4();
//       setFields(fields.map(f =>
//         f.id === activeField.id ? { ...f, rowId: newRowId, order: 0 } : f
//       ));
      
//       setActiveId(null);
//       setIsDragging(false);
//       setDropTarget(null);
//       return;
//     }
    
//     // Check if dropping on another field or the drop zone
//     const overField = fields.find(f => f.id === over.id);
    
//     if (overField) {
//       // Moving within same row
//       if (activeField.rowId === overField.rowId && dropTarget?.position !== 'new-row') {
//         const fieldsInRow = fields.filter(f => f.rowId === activeField.rowId);
//         const activeIndex = fieldsInRow.findIndex(f => f.id === activeField.id);
//         const overIndex = fieldsInRow.findIndex(f => f.id === overField.id);
        
//         let targetIndex = overIndex;
//         // Adjust index based on drop position
//         if (dropTarget?.position === 'after') {
//           targetIndex = overIndex + (activeIndex < overIndex ? 0 : 1);
//         } else {
//           targetIndex = overIndex - (activeIndex > overIndex ? 0 : 1);
//         }
        
//         // Ensure index is within bounds
//         targetIndex = Math.max(0, Math.min(fieldsInRow.length - 1, targetIndex));
  
//         if (activeIndex !== targetIndex) {
//           const reorderedRowFields = arrayMove(fieldsInRow, activeIndex, targetIndex);
          
//           const updatedFields = [...fields];
//           const otherFields = updatedFields.filter(field => field.rowId !== activeField.rowId);
          
//           const updatedRowFields = reorderedRowFields.map((field, index) => ({
//             ...field,
//             order: index
//           }));
          
//           setFields([...otherFields, ...updatedRowFields]);
//         }
//       } else {
//         // Moving to different row
//         const fieldsInTargetRow = fields.filter(f => f.rowId === overField.rowId);
        
//         // Determine insert position based on drop indicator
//         let newOrder = fieldsInTargetRow.length; // Default to end
//         if (dropTarget?.position === 'before') {
//           const overFieldOrder = overField.order || 0;
//           newOrder = overFieldOrder;
          
//           // Update order of fields that come after
//           setFields(fields.map(f => {
//             if (f.rowId === overField.rowId && (f.order || 0) >= overFieldOrder && f.id !== activeField.id) {
//               return { ...f, order: (f.order || 0) + 1 };
//             }
//             return f;
//           }));
//         }
        
//         // Update the active field
//         setFields(fields.map(f =>
//           f.id === activeField.id ? { ...f, rowId: overField.rowId, order: newOrder } : f
//         ));
//       }
//     } else if (over.id === 'form-layout-drop-zone') {
//       // Dropping on the main drop zone - create new row
//       const newRowId = uuidv4();
//       setFields(fields.map(f =>
//         f.id === activeField.id ? { ...f, rowId: newRowId, order: 0 } : f
//       ));
//     }
  
//     setActiveId(null);
//     setIsDragging(false);
//     setDropTarget(null);
//   };
  
//   // Handle drop event for adding new fields
//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const fieldType = e.dataTransfer.getData("text/plain");
//     if (!fieldType) return;

//     const newRowId = uuidv4();
//     const newField: Field = {
//       id: `field-${Date.now()}`,
//       type: fieldType as Field["type"],
//       label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
//       placeholder: "",
//       options: fieldType === "radio" ? [{ value: "option1", label: "Option 1" }] : [],
//       rowId: newRowId,
//       order: 0,
//     };

//     setFields(prev => [...prev, newField]);
//     setEditingFieldId(newField.id);
//   };

//   // Find active field for drag overlay
//   const activeField = activeId ? fields.find(f => f.id === activeId) : null;

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={rectIntersection}
//       onDragStart={handleDragStart}
//       onDragOver={handleDragOver}
//       onDragEnd={handleDragEnd}
//     >
//       {/* Drop Zone */}
//       <div
//         id="form-layout-drop-zone"
//         ref={dropZoneRef}
//         className={`ml-64 p-4 min-h-[90vh] pb-52 w-auto transition-all duration-300 overflow-y-auto ${
//           isDragging ? "bg-slate-200 border-2 border-dashed border-blue-500" : "bg-white"
//         }`}
//         onDrop={handleDrop}
//         onDragOver={e => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//       >
//         <h3 className="mb-4 text-xl font-semibold text-slate-800">Form Layout</h3>
//         {fields.length === 0 ? (
//           <p className="text-slate-500">Drag and drop fields here to build your form.</p>
//         ) : (
//           <div className="space-y-4">
//             {/* Vertical sorting for rows */}
//             <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
//               {rowIds.map(rowId => (
//                 <RowContainer
//                   key={rowId}
//                   rowId={rowId}
//                   fields={groupedFields[rowId]}
//                   editingFieldId={editingFieldId}
//                   setFields={setFields}
//                   setEditingFieldId={setEditingFieldId}
//                   allFields={fields}
//                   dropTarget={dropTarget}
//                   activeId={activeId}
//                 />
//               ))}
//             </SortableContext>
            
//             {/* New row indicator */}
//             {dropTarget?.position === 'new-row' && (
//               <div className="h-16 border-2 border-dashed border-blue-500 rounded-md bg-blue-50 flex items-center justify-center text-blue-500">
//                 Drop to create new row
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Drag Overlay */}
//       <DragOverlay>
//         {activeField && (
//           <div className="bg-white p-4 rounded-md border border-gray-300 shadow-md">
//             {activeField.label || "Unknown Field"}
//           </div>
//         )}
//       </DragOverlay>
//     </DndContext>
//   );
// };

// // Row container component for horizontal sorting
// const RowContainer = ({
//   rowId,
//   fields,
//   editingFieldId,
//   setFields,
//   setEditingFieldId,
//   allFields,
//   dropTarget,
//   activeId,
// }: {
//   rowId: string;
//   fields: Field[];
//   editingFieldId: string | null;
//   setFields: React.Dispatch<React.SetStateAction<Field[]>>;
//   setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
//   allFields: Field[];
//   dropTarget: { id: string, position: 'before' | 'after' | 'inside' | 'new-row' } | null;
//   activeId: string | null;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//     id: rowId,
//   });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   // Get field IDs for horizontal sorting
//   const fieldIds = fields.map(field => field.id);
  
//   // Check if any field in this row is currently being dragged
//   const hasActiveField = activeId && fields.some(field => field.id === activeId);
  
//   // Show a bottom indicator if we're about to create a new row after this one
//   const showNewRowIndicator = dropTarget?.position === 'new-row' && 
//                              fields.some(f => f.id === dropTarget.id);

//   return (
//     <motion.div
//       ref={setNodeRef}
//       style={style}
//       data-row-id={rowId}
//       className={`border flex border-gray-500 rounded-md p-2 bg-gray-50 ${
//         hasActiveField ? 'border-blue-300' : ''
//       }`}
//     >
//       <div
//         className="flex items-center mb-2 text-sm text-gray-500 cursor-grab"
//         {...attributes}
//         {...listeners}
//       >
//         <GripVerticalIcon size={16} className="mr-2 bg-slate-200 h-[4vh] rounded-xl" /> 
//       </div>

//       <SortableContext items={fieldIds} strategy={horizontalListSortingStrategy}>
//         <div className="flex flex-wrap gap-4 w-full relative">
//           {fields.map(field => (
//             <SortableField
//               key={field.id}
//               field={field}
//               isEditing={editingFieldId === field.id}
//               setFields={setFields}
//               setEditingFieldId={setEditingFieldId}
//               fields={allFields}
//               dropTarget={dropTarget}
//               isActiveField={field.id === activeId}
//             />
//           ))}
//         </div>
//       </SortableContext>
      
//       {/* Row bottom indicator for "new row" */}
//       {showNewRowIndicator && (
//         <div className="absolute left-0 right-0 bottom-0 h-4 -mb-4 flex items-center justify-center">
//           <div className="w-3/4 h-0.5 bg-blue-500"></div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// // Sortable field component
// const SortableField = ({
//   field,
//   isEditing,
//   setFields,
//   setEditingFieldId,
//   fields,
//   dropTarget,
//   isActiveField,
// }: {
//   field: Field;
//   isEditing: boolean;
//   setFields: React.Dispatch<React.SetStateAction<Field[]>>;
//   setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
//   fields: Field[];
//   dropTarget: { id: string, position: 'before' | 'after' | 'inside' | 'new-row' } | null;
//   isActiveField: boolean;
// }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: field.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     flex: '1 1 200px',
//     minWidth: '200px', 
//     maxWidth: '100%',
//     opacity: isDragging ? 0.4 : 1,
//   };

//   const handleDelete = () => {
//     setFields(prev => prev.filter(f => f.id !== field.id));
//     if (isEditing) {
//       setEditingFieldId(null);
//     }
//   };

//   // New function to extract field to a new row
//   const handleExtractToNewRow = () => {
//     const newRowId = uuidv4();
//     setFields(prev => 
//       prev.map(f => f.id === field.id ? { ...f, rowId: newRowId, order: 0 } : f)
//     );
//   };
  
//   const isDropTarget = dropTarget && dropTarget.id === field.id;
//   const showBeforeIndicator = isDropTarget && dropTarget.position === 'before';
//   const showAfterIndicator = isDropTarget && dropTarget.position === 'after';
//   const showNewRowIndicator = isDropTarget && dropTarget.position === 'new-row';

//   return (
//     <motion.div
//       id={field.id}
//       ref={setNodeRef}
//       style={style}
//       className={`relative p-4 rounded-md border ${
//         isDropTarget ? 'border-blue-500 shadow-md' : 'border-gray-500'
//       } ${
//         isDragging ? 'opacity-40' : ''
//       } bg-white hover:bg-gray-50 transition-all w-72 flex-grow-0 flex-shrink-0`}
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: isDragging ? 0.4 : 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Drop indicator - Before */}
//       {showBeforeIndicator && (
//         <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l-md" />
//       )}
      
//       {/* Drop indicator - After */}
//       {showAfterIndicator && (
//         <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-r-md" />
//       )}
      
//       {/* Drop indicator - New Row */}
//       {showNewRowIndicator && (
//         <div className="absolute left-0 right-0 bottom-0 h-1.5 bg-blue-500 rounded-b-md" />
//       )}

//       <div className="flex items-center justify-between mb-2">
//         <div
//           {...attributes}
//           {...listeners}
//           className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
//         >
//           <Move size={16} />
//         </div>
//         <div className="flex-1 text-left ml-2 font-medium text-gray-700 truncate">
//           {field.label}
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             className="p-1 rounded hover:bg-gray-100 transition-colors"
//             onClick={handleExtractToNewRow}
//             title="Move to new row"
//           >
//             <Rows2 size={16} color="purple"/>
//           </button>
//           <button
//             className="p-1 rounded hover:bg-gray-100 transition-colors"
//             onClick={() => setEditingFieldId(field.id)}
//             title="Edit field"
//           >
//             <SquarePen size={16} className="text-blue-500" />
//           </button>
//           <button
//             className="p-1 rounded hover:bg-gray-100 transition-colors"
//             onClick={handleDelete}
//             title="Delete field"
//           >
//             <Trash2 size={16} className="text-red-500" />
//           </button>
//         </div>
//       </div>
      
//       <AnimatePresence>
//         {isEditing && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="mt-3 border-t pt-3"
//           >
//             <FieldEditor
//               field={field}
//               isEditing={isEditing}
//               setFields={setFields}
//               setEditingFieldId={setEditingFieldId}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };




// import { useState, useMemo, useRef } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragOverlay,
//   DragEndEvent,
//   DragStartEvent,
//   DragOverEvent,
//   pointerWithin,
//   rectIntersection,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
//   arrayMove,
//   useSortable,
//   verticalListSortingStrategy,
//   horizontalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { ArrowRightLeft, GripVerticalIcon, Move, Rows2, SquarePen, Trash2, X } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";
// import { Field } from "./types";
// import { FieldEditor } from "./FieldEditor";

// // Add Dialog component with cancel functionality
// const Dialog = ({ isOpen, onClose, title, children, onCancel }) => {
//   if (!isOpen) return null;

//   const handleClose = () => {
//     // Execute cancel operation if provided
//     if (onCancel) {
//       onCancel();
//     }
//     // Close the dialog
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h3 className="text-lg font-medium">{title}</h3>
//           <button
//             onClick={handleClose}
//             className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <X size={20} />
//           </button>
//         </div>
//         <div className="p-4">{children}</div>
//       </div>
//     </div>
//   );
// };

// interface FormLayoutProps {
//   fields: Field[];
//   editingFieldId: string | null;
//   setFields: React.Dispatch<React.SetStateAction<Field[]>>;
//   setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
// }

// export const FormLayout = ({
//   fields,
//   editingFieldId,
//   setFields,
//   setEditingFieldId,
// }: FormLayoutProps) => {
//   const [activeId, setActiveId] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dropTarget, setDropTarget] = useState<{ 
//     id: string, 
//     position: 'before' | 'after' | 'inside' | 'new-row' 
//   } | null>(null);
  
//   // Add a state to store the original field values before editing
//   const [originalField, setOriginalField] = useState<Field | null>(null);
  
//   // Reference to the main drop zone
//   const dropZoneRef = useRef<HTMLDivElement>(null);

//   // Modify the function that sets the editing field ID to also store original field
//   const startEditing = (fieldId: string) => {
//     const fieldToEdit = fields.find(f => f.id === fieldId);
//     if (fieldToEdit) {
//       // Store a deep copy of the original field
//       setOriginalField(JSON.parse(JSON.stringify(fieldToEdit)));
//       setEditingFieldId(fieldId);
//     }
//   };

//   // Handle cancel operation
//   const handleCancel = () => {
//     if (originalField && editingFieldId) {
//       setFields(prev => prev.map(f => 
//         f.id === editingFieldId ? originalField : f
//       ));
//     }
//     setEditingFieldId(null);
//     setOriginalField(null);
//   };

//   // Group fields by rowId
//   const groupedFields = useMemo(() => {
//     const groups = fields.reduce((acc, field) => {
//       const rowId = field.rowId || `default-row-${field.id}`;
//       if (!acc[rowId]) acc[rowId] = [];
//       acc[rowId].push(field);
//       return acc;
//     }, {} as Record<string, Field[]>);

//     // Sort fields within each row by their order property
//     Object.keys(groups).forEach(rowId => {
//       groups[rowId].sort((a, b) => (a.order || 0) - (b.order || 0));
//     });

//     return groups;
//   }, [fields]);

//   // Dynamically derive rowIds based on groupedFields
//   const rowIds = useMemo(() => Object.keys(groupedFields), [groupedFields]);

//   // Define sensors for drag-and-drop
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 5, 
//       },
//     }),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   // Handle drag start event
//   const handleDragStart = (event: DragStartEvent) => {
//     setActiveId(event.active.id as string);
//     setIsDragging(true);
//   };

//   // Handle drag over event to show drop indicators
//   const handleDragOver = (event: DragOverEvent) => {
//     const { active, over } = event;
    
//     if (!over || !event.over?.rect) {
//       setDropTarget(null);
//       return;
//     }

//     // Skip if dragging a row
//     if (rowIds.includes(active.id as string)) {
//       return;
//     }

//     const activeField = fields.find(f => f.id === active.id);
//     if (!activeField) return;

//     // If over the main drop zone but not a specific field
//     if (over.id === 'form-layout-drop-zone') {
//       setDropTarget({ id: 'form-layout-drop-zone', position: 'new-row' });
//       return;
//     }

//     const overField = fields.find(f => f.id === over.id);
//     if (!overField) {
//       setDropTarget(null);
//       return;
//     }

//     // Get DOM elements for position calculations
//     const overElement = document.getElementById(over.id as string);
//     if (!overElement) {
//       setDropTarget(null);
//       return;
//     }

//     // Get row element (parent container)
//     const rowElement = overElement.closest('[data-row-id]');
//     if (!rowElement) {
//       setDropTarget(null);
//       return;
//     }

//     const rowRect = rowElement.getBoundingClientRect();
//     const fieldRect = overElement.getBoundingClientRect();
    
//     // Calculate pointer position relative to elements
//     const pointerX = event.over?.rect.left + (event.over?.rect.width / 2);
//     const pointerY = event.over?.rect.top + (event.over?.rect.height / 2);
    
//     // Check vertical position - if pointer is significantly below the row,
//     // indicate we're creating a new row
//     const verticalThreshold = 20; // pixels below the row to trigger new row
//     const isSignificantlyBelow = pointerY > (rowRect.bottom + verticalThreshold);
    
//     if (isSignificantlyBelow) {
//       setDropTarget({ id: over.id as string, position: 'new-row' });
//       return;
//     }
    
//     // Enhanced detection: Check if we're near the edges of the row
//     const horizontalEdgeSensitivity = 40; // pixels
//     const isNearLeftEdge = pointerX < (rowRect.left + horizontalEdgeSensitivity);
//     const isNearRightEdge = pointerX > (rowRect.right - horizontalEdgeSensitivity);
    
//     // If near edges and the field is from a different row, suggest new row
//     if ((isNearLeftEdge || isNearRightEdge) && activeField.rowId !== overField.rowId) {
//       setDropTarget({ id: over.id as string, position: 'new-row' });
//       return;
//     }
    
//     // Horizontal position within a field
//     const centerX = fieldRect.left + fieldRect.width / 2;
//     const position = pointerX < centerX ? 'before' : 'after';
    
//     setDropTarget({ id: over.id as string, position });
//   };

//   // Handle drag end event
//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
  
//     if (!over) {
//       setActiveId(null);
//       setIsDragging(false);
//       setDropTarget(null);
//       return;
//     }
  
//     // Handle row sorting
//     if (rowIds.includes(active.id as string)) {
//       if (rowIds.includes(over.id as string)) {
//         const activeIndex = rowIds.indexOf(active.id as string);
//         const overIndex = rowIds.indexOf(over.id as string);
  
//         if (activeIndex !== overIndex) {
//           const reorderedRowIds = arrayMove(rowIds, activeIndex, overIndex);
//           const rowPositionMap = rowIds.reduce((map, rowId, index) => {
//             map[rowId] = reorderedRowIds.indexOf(rowId);
//             return map;
//           }, {} as Record<string, number>);
          
//           const updatedFields = [...fields].sort((a, b) => {
//             const aRowId = a.rowId || '';
//             const bRowId = b.rowId || '';
//             if (aRowId !== bRowId) {
//               return (rowPositionMap[aRowId] || 0) - (rowPositionMap[bRowId] || 0);
//             }
//             return (a.order || 0) - (b.order || 0);
//           });
          
//           setFields(updatedFields);
//         }
//       }
//       setActiveId(null);
//       setIsDragging(false);
//       setDropTarget(null);
//       return;
//     }
  
//     // Handle field movement
//     const activeField = fields.find(f => f.id === active.id);
//     if (!activeField) {
//       setActiveId(null);
//       setIsDragging(false);
//       setDropTarget(null);
//       return;
//     }
  
//     // Check if we should create a new row based on the drop indicator
//     if (dropTarget?.position === 'new-row') {
//       const newRowId = uuidv4();
//       setFields(fields.map(f =>
//         f.id === activeField.id ? { ...f, rowId: newRowId, order: 0 } : f
//       ));
      
//       setActiveId(null);
//       setIsDragging(false);
//       setDropTarget(null);
//       return;
//     }
    
//     // Check if dropping on another field or the drop zone
//     const overField = fields.find(f => f.id === over.id);
    
//     if (overField) {
//       // Moving within same row
//       if (activeField.rowId === overField.rowId && dropTarget?.position !== 'new-row') {
//         const fieldsInRow = fields.filter(f => f.rowId === activeField.rowId);
//         const activeIndex = fieldsInRow.findIndex(f => f.id === activeField.id);
//         const overIndex = fieldsInRow.findIndex(f => f.id === overField.id);
        
//         let targetIndex = overIndex;
//         // Adjust index based on drop position
//         if (dropTarget?.position === 'after') {
//           targetIndex = overIndex + (activeIndex < overIndex ? 0 : 1);
//         } else {
//           targetIndex = overIndex - (activeIndex > overIndex ? 0 : 1);
//         }
        
//         // Ensure index is within bounds
//         targetIndex = Math.max(0, Math.min(fieldsInRow.length - 1, targetIndex));
  
//         if (activeIndex !== targetIndex) {
//           const reorderedRowFields = arrayMove(fieldsInRow, activeIndex, targetIndex);
          
//           const updatedFields = [...fields];
//           const otherFields = updatedFields.filter(field => field.rowId !== activeField.rowId);
          
//           const updatedRowFields = reorderedRowFields.map((field, index) => ({
//             ...field,
//             order: index
//           }));
          
//           setFields([...otherFields, ...updatedRowFields]);
//         }
//       } else {
//         // Moving to different row
//         const fieldsInTargetRow = fields.filter(f => f.rowId === overField.rowId);
        
//         // Determine insert position based on drop indicator
//         let newOrder = fieldsInTargetRow.length; // Default to end
//         if (dropTarget?.position === 'before') {
//           const overFieldOrder = overField.order || 0;
//           newOrder = overFieldOrder;
          
//           // Update order of fields that come after
//           setFields(fields.map(f => {
//             if (f.rowId === overField.rowId && (f.order || 0) >= overFieldOrder && f.id !== activeField.id) {
//               return { ...f, order: (f.order || 0) + 1 };
//             }
//             return f;
//           }));
//         }
        
//         // Update the active field
//         setFields(fields.map(f =>
//           f.id === activeField.id ? { ...f, rowId: overField.rowId, order: newOrder } : f
//         ));
//       }
//     } else if (over.id === 'form-layout-drop-zone') {
//       // Dropping on the main drop zone - create new row
//       const newRowId = uuidv4();
//       setFields(fields.map(f =>
//         f.id === activeField.id ? { ...f, rowId: newRowId, order: 0 } : f
//       ));
//     }
  
//     setActiveId(null);
//     setIsDragging(true);
//     setDropTarget(null);
//   };
  
//   // Handle drop event for adding new fields - updated to not open dialog automatically
//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const fieldType = e.dataTransfer.getData("text/plain");
//     if (!fieldType) return;

//     const newRowId = uuidv4();
//     const newField: Field = {
//       id: `field-${Date.now()}`,
//       type: fieldType as Field["type"],
//       label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
//       placeholder: "",
//       options: fieldType === "radio" ? [{ value: "option1", label: "Option 1" }] : [],
//       rowId: newRowId,
//       order: 0,
//     };

//     setFields(prev => [...prev, newField]);
//     // Removed automatic dialog opening
//   };

//   // Find active field for drag overlay
//   const activeField = activeId ? fields.find(f => f.id === activeId) : null;
  
//   // Find the field being edited for the dialog
//   const editingField = editingFieldId ? fields.find(f => f.id === editingFieldId) : null;

//   return (
//     <>
//       <DndContext
//         sensors={sensors}
//         collisionDetection={rectIntersection}
//         onDragStart={handleDragStart}
//         onDragOver={handleDragOver}
//         onDragEnd={handleDragEnd}
//       >
//         {/* Drop Zone */}
//         <div
//           id="form-layout-drop-zone"
//           ref={dropZoneRef}
//           className={`ml-72 p-4 min-h-[90vh] pb-52 w-auto transition-all duration-300 overflow-y-auto ${
//             isDragging ? "bg-slate-200 border-2 border-dashed border-blue-500" : "bg-white"
//           }`}
//           onDrop={handleDrop}
//           onDragOver={e => {
//             e.preventDefault();
//             setIsDragging(true);
//           }}
//           onDragLeave={() => setIsDragging(false)}
//         >
//           <h3 className="mb-4 text-xl font-semibold text-slate-800">Form Layout</h3>
//           {fields.length === 0 ? (
//             <p className="text-slate-500">Drag and drop fields here to build your form.</p>
//           ) : (
//             <div className="space-y-4">
//               {/* Vertical sorting for rows */}
//               <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
//                 {rowIds.map(rowId => (
//                   <RowContainer
//                     key={rowId}
//                     rowId={rowId}
//                     fields={groupedFields[rowId]}
//                     editingFieldId={editingFieldId}
//                     setFields={setFields}
//                     startEditing={startEditing}
//                     allFields={fields}
//                     dropTarget={dropTarget}
//                     activeId={activeId}
//                   />
//                 ))}
//               </SortableContext>
              
//               {/* New row indicator */}
//               {dropTarget?.position === 'new-row' && (
//                 <div className="h-16 border-2 border-dashed border-blue-500 rounded-md bg-blue-50 flex items-center justify-center text-blue-500">
//                   Drop to create new row
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Drag Overlay */}
//         <DragOverlay>
//           {activeField && (
//             <div className="bg-white p-4 rounded-md border border-gray-300 shadow-md">
//               {activeField.label || "Unknown Field"}
//             </div>
//           )}
//         </DragOverlay>
//       </DndContext>

//       {/* Field Editor Dialog with cancel handling */}
//       <Dialog 
//         isOpen={!!editingFieldId && !!editingField}
//         onClose={() => setEditingFieldId(null)}
//         onCancel={handleCancel}
//         title={`Edit ${editingField?.label || 'Field'}`}
//       >
//         {editingField && (
//           <FieldEditor
//             field={editingField}
//             isEditing={true}
//             setFields={setFields}
//             setEditingFieldId={setEditingFieldId}
//           />
//         )}
//       </Dialog>
//     </>
//   );
// };

// // Row container component for horizontal sorting
// const RowContainer = ({
//   rowId,
//   fields,
//   editingFieldId,
//   setFields,
//   startEditing,
//   allFields,
//   dropTarget,
//   activeId,
// }: {
//   rowId: string;
//   fields: Field[];
//   editingFieldId: string | null;
//   setFields: React.Dispatch<React.SetStateAction<Field[]>>;
//   startEditing: (fieldId: string) => void;
//   allFields: Field[];
//   dropTarget: { id: string, position: 'before' | 'after' | 'inside' | 'new-row' } | null;
//   activeId: string | null;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//     id: rowId,
//   });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   // Get field IDs for horizontal sorting
//   const fieldIds = fields.map(field => field.id);
  
//   // Check if any field in this row is currently being dragged
//   const hasActiveField = activeId && fields.some(field => field.id === activeId);
  
//   // Show a bottom indicator if we're about to create a new row after this one
//   const showNewRowIndicator = dropTarget?.position === 'new-row' && 
//                              fields.some(f => f.id === dropTarget.id);

//   return (
//     <motion.div
//       ref={setNodeRef}
//       style={style}
//       data-row-id={rowId}
//       className={`border flex border-gray-500 w-[45vw] rounded-md p-2 bg-gray-50 ${
//         hasActiveField ? 'border-blue-300' : ''
//       }`}
//     >
//       <div
//         className="flex items-center mb-2 text-sm text-gray-500 cursor-grab"
//         {...attributes}
//         {...listeners}
//       >
//         <GripVerticalIcon size={16} className="mr-2 bg-slate-200 h-[4vh] rounded-xl" /> 
//       </div>

//       <SortableContext items={fieldIds} strategy={horizontalListSortingStrategy}>
//         <div className="flex flex-wrap gap-4 w-full relative">
//           {fields.map(field => (
//             <SortableField
//               key={field.id}
//               field={field}
//               isEditing={editingFieldId === field.id}
//               setFields={setFields}
//               startEditing={startEditing}
//               fields={allFields}
//               dropTarget={dropTarget}
//               isActiveField={field.id === activeId}
//             />
//           ))}
//         </div>
//       </SortableContext>
      
//       {/* Row bottom indicator for "new row" */}
//       {showNewRowIndicator && (
//         <div className="absolute left-0 right-0 bottom-0 h-4 -mb-4 flex items-center justify-center">
//           <div className="w-3/4 h-0.5 bg-blue-500"></div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// // Sortable field component
// const SortableField = ({
//   field,
//   isEditing,
//   setFields,
//   startEditing,
//   fields,
//   dropTarget,
//   isActiveField,
// }: {
//   field: Field;
//   isEditing: boolean;
//   setFields: React.Dispatch<React.SetStateAction<Field[]>>;
//   startEditing: (fieldId: string) => void;
//   fields: Field[];
//   dropTarget: { id: string, position: 'before' | 'after' | 'inside' | 'new-row' } | null;
//   isActiveField: boolean;
// }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: field.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     flex: '1 1 200px',
//     minWidth: '200px', 
//     maxWidth: '100%',
//     opacity: isDragging ? 0.4 : 1,
//   };

//   const handleDelete = () => {
//     setFields(prev => prev.filter(f => f.id !== field.id));
//   };

//   // New function to extract field to a new row
//   const handleExtractToNewRow = () => {
//     const newRowId = uuidv4();
//     setFields(prev => 
//       prev.map(f => f.id === field.id ? { ...f, rowId: newRowId, order: 0 } : f)
//     );
//   };
  
//   const isDropTarget = dropTarget && dropTarget.id === field.id;
//   const showBeforeIndicator = isDropTarget && dropTarget.position === 'before';
//   const showAfterIndicator = isDropTarget && dropTarget.position === 'after';
//   const showNewRowIndicator = isDropTarget && dropTarget.position === 'new-row';

//   return (
//     <motion.div
//       id={field.id}
//       ref={setNodeRef}
//       style={style}
//       className={`relative p-4 rounded-md border ${
//         isDropTarget ? 'border-blue-500 shadow-md' : 'border-gray-500'
//       } ${
//         isDragging ? 'opacity-40' : ''
//       } bg-white hover:bg-gray-50 transition-all w-72 flex-grow-0 flex-shrink-0`}
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: isDragging ? 0.4 : 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Drop indicator - Before */}
//       {showBeforeIndicator && (
//         <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l-md" />
//       )}
      
//       {/* Drop indicator - After */}
//       {showAfterIndicator && (
//         <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-r-md" />
//       )}
      
//       {/* Drop indicator - New Row */}
//       {showNewRowIndicator && (
//         <div className="absolute left-0 right-0 bottom-0 h-1.5 bg-blue-500 rounded-b-md" />
//       )}

//       <div className="flex items-center justify-between mb-2">
//         <div
//           {...attributes}
//           {...listeners}
//           className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
//         >
//           <Move size={16} />
//         </div>
//         <div className="flex-1 text-left ml-2 font-medium text-gray-700 truncate">
//           {field.label}
//         </div>
//         <div className="flex items-center gap-1">
//           <button
//             className="p-1 rounded hover:bg-gray-100 transition-colors"
//             onClick={handleExtractToNewRow}
//             title="Move to new row"
//           >
//             <Rows2 size={16} color="purple"/>
//           </button>
//           <button
//             className="p-1 rounded hover:bg-gray-100 transition-colors"
//             onClick={() => startEditing(field.id)}
//             title="Edit field"
//           >
//             <SquarePen size={16} className="text-blue-500" />
//           </button>
//           <button
//             className="p-1 rounded hover:bg-gray-100 transition-colors"
//             onClick={handleDelete}
//             title="Delete field"
//           >
//             <Trash2 size={16} className="text-red-500" />
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };



import { useState, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowRightLeft, GripVerticalIcon, Move, Rows2, SquarePen, Trash2, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "./types";
import { FieldEditor } from "./FieldEditor";

// Dialog Component
const Dialog = ({ isOpen, onClose, title, children, onCancel }) => {
  if (!isOpen) return null;
  const handleClose = () => {
    if (onCancel) onCancel();
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

interface FormLayoutProps {
  fields: Field[];
  editingFieldId: string | null;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FormLayout = ({
  fields,
  editingFieldId,
  setFields,
  setEditingFieldId,
}: FormLayoutProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dropTarget, setDropTarget] = useState<{ id: string; position: 'before' | 'after' | 'inside' } | null>(null);
  const [originalField, setOriginalField] = useState<Field | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [dropPosition, setDropPosition] = useState<{ y: number, rowId?: string } | null>(null);

  const startEditing = (fieldId: string) => {
    const fieldToEdit = fields.find(f => f.id === fieldId);
    if (fieldToEdit) {
      setOriginalField(JSON.parse(JSON.stringify(fieldToEdit)));
      setEditingFieldId(fieldId);
    }
  };

  const handleCancel = () => {
    if (originalField && editingFieldId) {
      setFields(prev => prev.map(f => (f.id === editingFieldId ? originalField : f)));
    }
    setEditingFieldId(null);
    setOriginalField(null);
  };

  const groupedFields = useMemo(() => {
    const groups = fields.reduce((acc, field) => {
      const rowId = field.rowId || `default-row-${field.id}`;
      if (!acc[rowId]) acc[rowId] = [];
      acc[rowId].push(field);
      return acc;
    }, {} as Record<string, Field[]>);
    Object.keys(groups).forEach(rowId => {
      groups[rowId].sort((a, b) => (a.order || 0) - (b.order || 0));
    });
    return groups;
  }, [fields]);

  const rowIds = useMemo(() => Object.keys(groupedFields), [groupedFields]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    console.log('Drag started', event.active.id);
    setIsDragging(true);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;


    if (!over || !event.over?.rect) {
      setDropTarget(null);
      return;
    }
    if (!over) {
      // Track mouse position when over empty space
      setDropPosition({
        y: event.over?.rect?.top || 0,
        rowId: undefined
      });
      setDropTarget({ id: 'form-layout-drop-zone', position: 'inside' });
      return;
    }

    if (rowIds.includes(active.id as string)) return;

    const activeField = fields.find(f => f.id === active.id);
    if (!activeField) return;

    if (over.id === 'form-layout-drop-zone') {
      setDropTarget({ id: 'form-layout-drop-zone', position: 'inside' });
      return;
    }

    const overField = fields.find(f => f.id === over.id);
    if (!overField) {
      setDropTarget(null);
      return;
    }

    const overElement = document.getElementById(over.id as string);
    if (!overElement) {
      setDropTarget(null);
      return;
    }

    const fieldRect = overElement.getBoundingClientRect();
    const pointerX = event.over?.rect.left + (event.over?.rect.width / 2);

    const centerX = fieldRect.left + fieldRect.width / 2;
    const position = pointerX < centerX ? 'before' : 'after';
    setDropTarget({ id: over.id as string, position });

    setDropPosition(null);

  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Always clean up
    setActiveId(null);
    setIsDragging(false);
    setDropTarget(null);
    setDropPosition(null);

    if (!active.id) return;

    // Handle drop in empty space (create new row)
    if (!over) {
      const activeField = fields.find(f => f.id === active.id);
      if (!activeField) return;

      const newRowId = uuidv4();
      let insertIndex = fields.length;

      // Find insert position based on drop position
      if (dropPosition) {
        const rowElements = document.querySelectorAll('[data-row-id]');
        rowElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top > dropPosition.y) {
            const rowId = el.getAttribute('data-row-id');
            const firstFieldInRow = fields.find(f => f.rowId === rowId);
            if (firstFieldInRow) {
              insertIndex = fields.indexOf(firstFieldInRow);
            }
          }
        });
      }

      const updatedFields = [...fields];
      updatedFields.splice(insertIndex, 0, {
        ...activeField,
        rowId: newRowId,
        order: 0
      });

      // Remove from original position
      const originalIndex = updatedFields.findIndex(f => f.id === active.id && f.rowId !== newRowId);
      if (originalIndex > -1) {
        updatedFields.splice(originalIndex, 1);
      }

      setFields(updatedFields);
      return;
    }

    // Handle vertical row sorting
    if (rowIds.includes(active.id as string)) {
      if (rowIds.includes(over.id as string)) {
        const activeIndex = rowIds.indexOf(active.id as string);
        const overIndex = rowIds.indexOf(over.id as string);

        if (activeIndex !== overIndex) {
          // Create a mapping of rowId to its fields
          const rowFieldsMap: Record<string, Field[]> = {};
          fields.forEach(field => {
            if (!rowFieldsMap[field.rowId]) {
              rowFieldsMap[field.rowId] = [];
            }
            rowFieldsMap[field.rowId].push(field);
          });

          // Get all rowIds in their current order
          const currentRowOrder = [...new Set(fields.map(f => f.rowId))];

          // Swap the positions of the active and over rows
          const newRowOrder = [...currentRowOrder];
          [newRowOrder[activeIndex], newRowOrder[overIndex]] =
            [newRowOrder[overIndex], newRowOrder[activeIndex]];

          // Rebuild the fields array with the new row order
          const newFields: Field[] = [];
          newRowOrder.forEach(rowId => {
            if (rowFieldsMap[rowId]) {
              newFields.push(...rowFieldsMap[rowId]);
            }
          });

          setFields(newFields);
        }
      }
      return;
    }

    // Handle field movement
    const activeField = fields.find(f => f.id === active.id);
    if (!activeField) return;

    const overField = fields.find(f => f.id === over.id);

    if (overField) {
      // Moving within the same row
      if (activeField.rowId === overField.rowId) {
        const fieldsInRow = fields.filter(f => f.rowId === activeField.rowId);
        const activeIndex = fieldsInRow.findIndex(f => f.id === activeField.id);
        const overIndex = fieldsInRow.findIndex(f => f.id === overField.id);

        let targetIndex = overIndex;
        if (dropTarget?.position === 'after') {
          targetIndex = overIndex + (activeIndex < overIndex ? 0 : 1);
        } else if (dropTarget?.position === 'before') {
          targetIndex = overIndex - (activeIndex > overIndex ? 0 : 1);
        }

        targetIndex = Math.max(0, Math.min(fieldsInRow.length - 1, targetIndex));

        if (activeIndex !== targetIndex) {
          // Create a new array with the reordered fields
          const updatedFields = [...fields];

          // Get the original row order
          const rowOrder = [...new Set(fields.map(f => f.rowId))];

          // Reorder the fields in this row
          const reorderedRowFields = arrayMove(
            fieldsInRow,
            activeIndex,
            targetIndex
          ).map((field, index) => ({
            ...field,
            order: index
          }));

          // Rebuild the fields array while preserving row order
          const newFields: Field[] = [];
          rowOrder.forEach(rowId => {
            if (rowId === activeField.rowId) {
              newFields.push(...reorderedRowFields);
            } else {
              newFields.push(...updatedFields.filter(f => f.rowId === rowId));
            }
          });

          setFields(newFields);
        }
      } else {
        // Moving to a different row
        const fieldsInTargetRow = fields.filter(f => f.rowId === overField.rowId);
        let newOrder = fieldsInTargetRow.length;

        if (dropTarget?.position === 'before') {
          const overFieldOrder = overField.order || 0;
          newOrder = overFieldOrder;

          // Shift other fields down
          const updatedFields = fields.map(f => {
            if (f.id === activeField.id) {
              return { ...f, rowId: overField.rowId, order: newOrder };
            }
            if (f.rowId === overField.rowId && (f.order || 0) >= overFieldOrder && f.id !== overField.id) {
              return { ...f, order: (f.order || 0) + 1 };
            }
            return f;
          });

          setFields(updatedFields);
        } else {
          // Add to end of target row
          const updatedFields = fields.map(f =>
            f.id === activeField.id
              ? { ...f, rowId: overField.rowId, order: newOrder }
              : f
          );
          setFields(updatedFields);
        }
      }
    } else if (over.id === 'form-layout-drop-zone') {
      // Dropping on the main drop zone - create a new row
      const newRowId = uuidv4();
      const updatedFields = fields.map(f =>
        f.id === activeField.id ? { ...f, rowId: newRowId, order: 0 } : f
      );
      setFields(updatedFields);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const fieldType = e.dataTransfer.getData("text/plain");
    if (!fieldType) return;

    const dropElement = document.elementFromPoint(e.clientX, e.clientY);
    const rowElement = dropElement?.closest('[data-row-id]');
    if (rowElement && rowElement.getAttribute('data-row-id')) {
      const targetRowId = rowElement.getAttribute('data-row-id');
      const fieldsInRow = fields.filter(f => f.rowId === targetRowId);
      const newOrder = fieldsInRow.length > 0
        ? Math.max(...fieldsInRow.map(f => f.order || 0)) + 1
        : 0;
      const newField: Field = {
        id: `field-${Date.now()}`,
        type: fieldType as Field["type"],
        label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
        placeholder: "",
        options: fieldType === "radio" ? [{ value: "option1", label: "Option 1" }] : [],
        rowId: targetRowId,
        order: newOrder,
        required: false,
      };
      setFields(prev => [...prev, newField]);
    } else {
      const newRowId = uuidv4();
      const newField: Field = {
        id: `field-${Date.now()}`,
        type: fieldType as Field["type"],
        label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
        placeholder: "",
        options: fieldType === "radio" ? [{ value: "option1", label: "Option 1" }] : [],
        rowId: newRowId,
        order: 0,
        required: false,
      };
      setFields(prev => [...prev, newField]);
    }
  };

  const activeField = activeId ? fields.find(f => f.id === activeId) : null;
  const editingField = editingFieldId ? fields.find(f => f.id === editingFieldId) : null;

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={(e) => {
          console.log('START', e.active.id);
          handleDragStart(e);
        }}
        onDragMove={(e) => console.log('MOVE', e.active.id, e.over?.id)}
        onDragOver={(e) => {
          console.log('OVER', e.over?.id);
          handleDragOver(e);
        }}
        onDragEnd={(e) => {
          console.log('END', e.over?.id);
          handleDragEnd(e);
        }}
        onDragCancel={() => console.log('CANCELED')}
      >
        <div
          id="form-layout-drop-zone"
          ref={dropZoneRef}
          className={`ml-72 p-4 min-h-[90vh] pb-52 w-auto transition-all duration-300 overflow-y-auto ${isDragging ? "bg-blue-50 border-2 border-dashed border-blue-500" : "bg-white"
            }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation(); // Add this
            setIsDragging(true);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            // Only deactivate if leaving the entire drop zone
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsDragging(false);
            }
          }}
        >
          <h3 className="mb-4 text-xl font-semibold text-slate-800">Form Layout</h3>
          {fields.length === 0 ? (
            <p className="text-slate-500">Drag and drop fields here to build your form.</p>
          ) : (
            <div className="space-y-4">
              <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
                {rowIds.map(rowId => (
                  <RowContainer
                    key={rowId}
                    rowId={rowId}
                    fields={groupedFields[rowId]}
                    editingFieldId={editingFieldId}
                    setFields={setFields}
                    startEditing={startEditing}
                    allFields={fields}
                    dropTarget={dropTarget}
                    activeId={activeId}
                    onDrop={handleDrop}
                    rowIds={rowIds} // Add this

                  />
                ))}
              </SortableContext>
            </div>
          )}
        </div>
        <DragOverlay>
          {activeField && (
            <div className="bg-white p-4 rounded-md border border-gray-300 shadow-md">
              {activeField.label || "Unknown Field"}
            </div>
          )}
        </DragOverlay>
      </DndContext>
      <Dialog
        isOpen={!!editingFieldId && !!editingField}
        onClose={() => setEditingFieldId(null)}
        onCancel={handleCancel}
        title={`Edit ${editingField?.label || 'Field'}`}
      >
        {editingField && (
          <FieldEditor
            field={editingField}
            isEditing={true}
            setFields={setFields}
            setEditingFieldId={setEditingFieldId}
          />
        )}
      </Dialog>
    </>
  );
};

// Row Container Component
const RowContainer = ({
  rowId,
  fields,
  editingFieldId,
  setFields,
  startEditing,
  allFields,
  dropTarget,
  activeId,
  onDrop,
  rowIds,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: rowId,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 1000 : 'auto',
  };
  const fieldIds = fields.map(field => field.id);
  const hasActiveField = activeId && fields.some(field => field.id === activeId);

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      data-row-id={rowId}
      data-row-index={rowIds.indexOf(rowId)} // Add this
      className={`border flex border-gray-500 rounded-md p-2 bg-gray-50 ${hasActiveField ? 'border-blue-300' : ''}`}
    >
      <div
        className="flex items-center mb-2 text-sm text-gray-500 cursor-grab"
        {...attributes}
        {...listeners}
      >
        <GripVerticalIcon size={16} className="mr-2 bg-slate-200 h-[4vh] rounded-xl" />
      </div>
      <SortableContext items={fieldIds} strategy={horizontalListSortingStrategy}>
        <div className="flex flex-wrap gap-4 w-full relative">
          {fields.map(field => (
            <SortableField
              key={field.id}
              field={field}
              isEditing={editingFieldId === field.id}
              setFields={setFields}
              startEditing={startEditing}
              fields={allFields}
              dropTarget={dropTarget}
              isActiveField={field.id === activeId}
            />
          ))}
        </div>
      </SortableContext>
    </motion.div>
  );
};

// Sortable Field Component
const SortableField = ({
  field,
  isEditing,
  setFields,
  startEditing,
  fields,
  dropTarget,
  isActiveField,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    flex: '1 1 200px',
    minWidth: '200px',
    maxWidth: '100%',
    opacity: isDragging ? 0.4 : 1,
  };

  const handleDelete = () => {
    setFields(prev => prev.filter(f => f.id !== field.id));
  };

  const isDropTarget = dropTarget && dropTarget.id === field.id;
  const showBeforeIndicator = isDropTarget && dropTarget.position === 'before';
  const showAfterIndicator = isDropTarget && dropTarget.position === 'after';

  return (
    <motion.div
      id={field.id}
      ref={setNodeRef}
      style={style}
      className={`relative p-4 rounded-md border ${isDropTarget ? 'border-blue-500 shadow-md' : 'border-gray-500'
        } ${isDragging ? 'opacity-40' : ''} bg-white hover:bg-gray-50 transition-all w-72 flex-grow-0 flex-shrink-0`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isDragging ? 0.4 : 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {showBeforeIndicator && (
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l-md" />
      )}
      {showAfterIndicator && (
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-r-md" />
      )}
      <div className="flex items-center justify-between mb-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
        >
          <Move size={16} />
        </div>
        <div className="flex-1 text-left ml-2 font-medium text-gray-700 truncate">{field.label}</div>
        <div className="flex items-center gap-2">
          <button
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            onClick={() => startEditing(field.id)}
            title="Edit field"
          >
            <SquarePen size={16} className="text-blue-500" />
          </button>
          <button
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            onClick={handleDelete}
            title="Delete field"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};


