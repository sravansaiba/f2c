<<<<<<< HEAD
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

// // Dialog Component
// const Dialog = ({ isOpen, onClose, title, children, onCancel }) => {
//   if (!isOpen) return null;
//   const handleClose = () => {
//     if (onCancel) onCancel();
//     onClose();
//   };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h3 className="text-lg font-medium">{title}</h3>
//           <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
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
//   const [dropTarget, setDropTarget] = useState<{ id: string; position: 'before' | 'after' | 'inside' } | null>(null);
//   const [originalField, setOriginalField] = useState<Field | null>(null);
//   const dropZoneRef = useRef<HTMLDivElement>(null);
//   const [dropPosition, setDropPosition] = useState<{ y: number, rowId?: string } | null>(null);

//   const startEditing = (fieldId: string) => {
//     const fieldToEdit = fields.find(f => f.id === fieldId);
//     if (fieldToEdit) {
//       setOriginalField(JSON.parse(JSON.stringify(fieldToEdit)));
//       setEditingFieldId(fieldId);
//     }
//   };

//   const handleCancel = () => {
//     if (originalField && editingFieldId) {
//       setFields(prev => prev.map(f => (f.id === editingFieldId ? originalField : f)));
//     }
//     setEditingFieldId(null);
//     setOriginalField(null);
//   };

//   const groupedFields = useMemo(() => {
//     const groups = fields.reduce((acc, field) => {
//       const rowId = field.rowId || `default-row-${field.id}`;
//       if (!acc[rowId]) acc[rowId] = [];
//       acc[rowId].push(field);
//       return acc;
//     }, {} as Record<string, Field[]>);
//     Object.keys(groups).forEach(rowId => {
//       groups[rowId].sort((a, b) => (a.order || 0) - (b.order || 0));
//     });
//     return groups;
//   }, [fields]);

//   const rowIds = useMemo(() => Object.keys(groupedFields), [groupedFields]);

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   const handleDragStart = (event: DragStartEvent) => {
//     setActiveId(event.active.id as string);
//     console.log('Drag started', event.active.id);
//     setIsDragging(true);
//   };

//   const handleDragOver = (event: DragOverEvent) => {
//     const { active, over } = event;


//     if (!over || !event.over?.rect) {
//       setDropTarget(null);
//       return;
//     }
//     if (!over) {
//       // Track mouse position when over empty space
//       setDropPosition({
//         y: event.over?.rect?.top || 0,
//         rowId: undefined
//       });
//       setDropTarget({ id: 'form-layout-drop-zone', position: 'inside' });
//       return;
//     }

//     if (rowIds.includes(active.id as string)) return;

//     const activeField = fields.find(f => f.id === active.id);
//     if (!activeField) return;

//     if (over.id === 'form-layout-drop-zone') {
//       setDropTarget({ id: 'form-layout-drop-zone', position: 'inside' });
//       return;
//     }

//     const overField = fields.find(f => f.id === over.id);
//     if (!overField) {
//       setDropTarget(null);
//       return;
//     }

//     const overElement = document.getElementById(over.id as string);
//     if (!overElement) {
//       setDropTarget(null);
//       return;
//     }

//     const fieldRect = overElement.getBoundingClientRect();
//     const pointerX = event.over?.rect.left + (event.over?.rect.width / 2);

//     const centerX = fieldRect.left + fieldRect.width / 2;
//     const position = pointerX < centerX ? 'before' : 'after';
//     setDropTarget({ id: over.id as string, position });

//     setDropPosition(null);

//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     // Always clean up
//     setActiveId(null);
//     setIsDragging(false);
//     setDropTarget(null);
//     setDropPosition(null);

//     if (!active.id) return;

//     // Handle drop in empty space (create new row)
//     if (!over) {
//       const activeField = fields.find(f => f.id === active.id);
//       if (!activeField) return;

//       const newRowId = uuidv4();
//       let insertIndex = fields.length;

//       // Find insert position based on drop position
//       if (dropPosition) {
//         const rowElements = document.querySelectorAll('[data-row-id]');
//         rowElements.forEach((el) => {
//           const rect = el.getBoundingClientRect();
//           if (rect.top > dropPosition.y) {
//             const rowId = el.getAttribute('data-row-id');
//             const firstFieldInRow = fields.find(f => f.rowId === rowId);
//             if (firstFieldInRow) {
//               insertIndex = fields.indexOf(firstFieldInRow);
//             }
//           }
//         });
//       }

//       const updatedFields = [...fields];
//       updatedFields.splice(insertIndex, 0, {
//         ...activeField,
//         rowId: newRowId,
//         order: 0
//       });

//       // Remove from original position
//       const originalIndex = updatedFields.findIndex(f => f.id === active.id && f.rowId !== newRowId);
//       if (originalIndex > -1) {
//         updatedFields.splice(originalIndex, 1);
//       }

//       setFields(updatedFields);
//       return;
//     }

//     // Handle vertical row sorting
//     if (rowIds.includes(active.id as string)) {
//       if (rowIds.includes(over.id as string)) {
//         const activeIndex = rowIds.indexOf(active.id as string);
//         const overIndex = rowIds.indexOf(over.id as string);

//         if (activeIndex !== overIndex) {
//           // Create a mapping of rowId to its fields
//           const rowFieldsMap: Record<string, Field[]> = {};
//           fields.forEach(field => {
//             if (!rowFieldsMap[field.rowId]) {
//               rowFieldsMap[field.rowId] = [];
//             }
//             rowFieldsMap[field.rowId].push(field);
//           });

//           // Get all rowIds in their current order
//           const currentRowOrder = [...new Set(fields.map(f => f.rowId))];

//           // Swap the positions of the active and over rows
//           const newRowOrder = [...currentRowOrder];
//           [newRowOrder[activeIndex], newRowOrder[overIndex]] =
//             [newRowOrder[overIndex], newRowOrder[activeIndex]];

//           // Rebuild the fields array with the new row order
//           const newFields: Field[] = [];
//           newRowOrder.forEach(rowId => {
//             if (rowFieldsMap[rowId]) {
//               newFields.push(...rowFieldsMap[rowId]);
//             }
//           });

//           setFields(newFields);
//         }
//       }
//       return;
//     }

//     // Handle field movement
//     const activeField = fields.find(f => f.id === active.id);
//     if (!activeField) return;

//     const overField = fields.find(f => f.id === over.id);

//     if (overField) {
//       // Moving within the same row
//       if (activeField.rowId === overField.rowId) {
//         const fieldsInRow = fields.filter(f => f.rowId === activeField.rowId);
//         const activeIndex = fieldsInRow.findIndex(f => f.id === activeField.id);
//         const overIndex = fieldsInRow.findIndex(f => f.id === overField.id);

//         let targetIndex = overIndex;
//         if (dropTarget?.position === 'after') {
//           targetIndex = overIndex + (activeIndex < overIndex ? 0 : 1);
//         } else if (dropTarget?.position === 'before') {
//           targetIndex = overIndex - (activeIndex > overIndex ? 0 : 1);
//         }

//         targetIndex = Math.max(0, Math.min(fieldsInRow.length - 1, targetIndex));

//         if (activeIndex !== targetIndex) {
//           // Create a new array with the reordered fields
//           const updatedFields = [...fields];

//           // Get the original row order
//           const rowOrder = [...new Set(fields.map(f => f.rowId))];

//           // Reorder the fields in this row
//           const reorderedRowFields = arrayMove(
//             fieldsInRow,
//             activeIndex,
//             targetIndex
//           ).map((field, index) => ({
//             ...field,
//             order: index
//           }));

//           // Rebuild the fields array while preserving row order
//           const newFields: Field[] = [];
//           rowOrder.forEach(rowId => {
//             if (rowId === activeField.rowId) {
//               newFields.push(...reorderedRowFields);
//             } else {
//               newFields.push(...updatedFields.filter(f => f.rowId === rowId));
//             }
//           });

//           setFields(newFields);
//         }
//       } else {
//         // Moving to a different row
//         const fieldsInTargetRow = fields.filter(f => f.rowId === overField.rowId);
//         let newOrder = fieldsInTargetRow.length;

//         if (dropTarget?.position === 'before') {
//           const overFieldOrder = overField.order || 0;
//           newOrder = overFieldOrder;

//           // Shift other fields down
//           const updatedFields = fields.map(f => {
//             if (f.id === activeField.id) {
//               return { ...f, rowId: overField.rowId, order: newOrder };
//             }
//             if (f.rowId === overField.rowId && (f.order || 0) >= overFieldOrder && f.id !== overField.id) {
//               return { ...f, order: (f.order || 0) + 1 };
//             }
//             return f;
//           });

//           setFields(updatedFields);
//         } else {
//           // Add to end of target row
//           const updatedFields = fields.map(f =>
//             f.id === activeField.id
//               ? { ...f, rowId: overField.rowId, order: newOrder }
//               : f
//           );
//           setFields(updatedFields);
//         }
//       }
//     } else if (over.id === 'form-layout-drop-zone') {
//       // Dropping on the main drop zone - create a new row
//       const newRowId = uuidv4();
//       const updatedFields = fields.map(f =>
//         f.id === activeField.id ? { ...f, rowId: newRowId, order: 0 } : f
//       );
//       setFields(updatedFields);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const fieldType = e.dataTransfer.getData("text/plain");
//     if (!fieldType) return;

//     const dropElement = document.elementFromPoint(e.clientX, e.clientY);
//     const rowElement = dropElement?.closest('[data-row-id]');
//     if (rowElement && rowElement.getAttribute('data-row-id')) {
//       const targetRowId = rowElement.getAttribute('data-row-id');
//       const fieldsInRow = fields.filter(f => f.rowId === targetRowId);
//       const newOrder = fieldsInRow.length > 0
//         ? Math.max(...fieldsInRow.map(f => f.order || 0)) + 1
//         : 0;
//       const newField: Field = {
//         id: `field-${Date.now()}`,
//         type: fieldType as Field["type"],
//         label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
//         placeholder: "",
//         options: fieldType === "radio" ? [{ value: "option1", label: "Option 1" }] : [],
//         rowId: targetRowId,
//         order: newOrder,
//         required: false,
//       };
//       setFields(prev => [...prev, newField]);
//     } else {
//       const newRowId = uuidv4();
//       const newField: Field = {
//         id: `field-${Date.now()}`,
//         type: fieldType as Field["type"],
//         label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
//         placeholder: "",
//         options: fieldType === "radio" ? [{ value: "option1", label: "Option 1" }] : [],
//         rowId: newRowId,
//         order: 0,
//         required: false,
//       };
//       setFields(prev => [...prev, newField]);
//     }
//   };

//   const activeField = activeId ? fields.find(f => f.id === activeId) : null;
//   const editingField = editingFieldId ? fields.find(f => f.id === editingFieldId) : null;

//   return (
//     <>
//       <DndContext
//         sensors={sensors}
//         onDragStart={(e) => {
//           console.log('START', e.active.id);
//           handleDragStart(e);
//         }}
//         onDragMove={(e) => console.log('MOVE', e.active.id, e.over?.id)}
//         onDragOver={(e) => {
//           console.log('OVER', e.over?.id);
//           handleDragOver(e);
//         }}
//         onDragEnd={(e) => {
//           console.log('END', e.over?.id);
//           handleDragEnd(e);
//         }}
//         onDragCancel={() => console.log('CANCELED')}
//       >
//         <div
//           id="form-layout-drop-zone"
//           ref={dropZoneRef}
//           className={`ml-72 p-4 min-h-[90vh] pb-52 w-auto transition-all duration-300 overflow-y-auto ${isDragging ? "bg-blue-50 border-2 border-dashed border-blue-500" : "bg-white"
//             }`}
//           onDrop={handleDrop}
//           onDragOver={(e) => {
//             e.preventDefault();
//             e.stopPropagation(); // Add this
//             setIsDragging(true);
//           }}
//           onDragEnter={(e) => {
//             e.preventDefault();
//             setIsDragging(true);
//           }}
//           onDragLeave={(e) => {
//             // Only deactivate if leaving the entire drop zone
//             if (!e.currentTarget.contains(e.relatedTarget as Node)) {
//               setIsDragging(false);
//             }
//           }}
//         >
//           <h3 className="mb-4 text-xl font-semibold text-slate-800">Form Layout</h3>
//           {fields.length === 0 ? (
//             <p className="text-slate-500">Drag and drop fields here to build your form.</p>
//           ) : (
//             <div className="space-y-4">
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
//                     onDrop={handleDrop}
//                     rowIds={rowIds} // Add this

//                   />
//                 ))}
//               </SortableContext>
//             </div>
//           )}
//         </div>
//         <DragOverlay>
//           {activeField && (
//             <div className="bg-white p-4 rounded-md border border-gray-300 shadow-md">
//               {activeField.label || "Unknown Field"}
//             </div>
//           )}
//         </DragOverlay>
//       </DndContext>
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

// // Row Container Component
// const RowContainer = ({
//   rowId,
//   fields,
//   editingFieldId,
//   setFields,
//   startEditing,
//   allFields,
//   dropTarget,
//   activeId,
//   onDrop,
//   rowIds,
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//     id: rowId,
//   });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     zIndex: transform ? 1000 : 'auto',
//   };
//   const fieldIds = fields.map(field => field.id);
//   const hasActiveField = activeId && fields.some(field => field.id === activeId);

//   return (
//     <motion.div
//       ref={setNodeRef}
//       style={style}
//       data-row-id={rowId}
//       data-row-index={rowIds.indexOf(rowId)} // Add this
//       className={`border flex border-gray-500 rounded-md p-2 bg-gray-50 ${hasActiveField ? 'border-blue-300' : ''}`}
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
//     </motion.div>
//   );
// };

// // Sortable Field Component
// const SortableField = ({
//   field,
//   isEditing,
//   setFields,
//   startEditing,
//   fields,
//   dropTarget,
//   isActiveField,
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
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

//   const isDropTarget = dropTarget && dropTarget.id === field.id;
//   const showBeforeIndicator = isDropTarget && dropTarget.position === 'before';
//   const showAfterIndicator = isDropTarget && dropTarget.position === 'after';

//   return (
//     <motion.div
//       id={field.id}
//       ref={setNodeRef}
//       style={style}
//       className={`relative p-4 rounded-md border ${isDropTarget ? 'border-blue-500 shadow-md' : 'border-gray-500'
//         } ${isDragging ? 'opacity-40' : ''} bg-white hover:bg-gray-50 transition-all w-72 flex-grow-0 flex-shrink-0`}
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: isDragging ? 0.4 : 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//       {showBeforeIndicator && (
//         <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l-md" />
//       )}
//       {showAfterIndicator && (
//         <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-r-md" />
//       )}
//       <div className="flex items-center justify-between mb-2">
//         <div
//           {...attributes}
//           {...listeners}
//           className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
//         >
//           <Move size={16} />
//         </div>
//         <div className="flex-1 text-left ml-2 font-medium text-gray-700 truncate">{field.label}</div>
//         <div className="flex items-center gap-2">
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




import { useState, useMemo, useRef, useEffect } from "react";
=======
import { useState, useMemo, useRef } from "react";
>>>>>>> 99663ffbef49c40f8107a13840c50d2d9fc52ba3
import { AnimatePresence, motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
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
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon, Move, SquarePen, Trash2, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "./types";
import { FieldEditor } from "./FieldEditor";

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
  const [visibleDropZone, setVisibleDropZone] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position during drag
  useEffect(() => {
    if (!isDragging) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Find the closest row and determine if the mouse is above or below
      const rowElements = Array.from(document.querySelectorAll('[data-row-id]'));
      let closestDropZone: string | null = null;
      
      // Check for dropping at the very top
      const firstRow = rowElements[0];
      if (firstRow) {
        const firstRowRect = firstRow.getBoundingClientRect();
        if (e.clientY < firstRowRect.top) {
          closestDropZone = "drop-zone-top";
        }
      }
      
      // Check for dropping between or after rows
      if (!closestDropZone) {
        for (let i = 0; i < rowElements.length; i++) {
          const rowEl = rowElements[i];
          const rect = rowEl.getBoundingClientRect();
          
          // If mouse is below this row
          if (e.clientY > rect.bottom) {
            // If this is the last row or mouse is above the next row
            if (i === rowElements.length - 1) {
              closestDropZone = `drop-zone-after-${rowEl.getAttribute('data-row-id')}`;
              break;
            } else {
              const nextRowEl = rowElements[i + 1];
              const nextRect = nextRowEl.getBoundingClientRect();
              if (e.clientY < nextRect.top) {
                closestDropZone = `drop-zone-after-${rowEl.getAttribute('data-row-id')}`;
                break;
              }
            }
          }
        }
      }
      
      setVisibleDropZone(closestDropZone);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

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
    setIsDragging(true);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) {
      setDropTarget(null);
      return;
    }

    if (rowIds.includes(active.id as string)) return;

    const activeField = fields.find(f => f.id === active.id);
    if (!activeField) return;

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
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
  
    setActiveId(null);
    setIsDragging(false);
    setDropTarget(null);
    setVisibleDropZone(null);
  
    if (!active.id) return;
  
    // Case 1: Vertical row sorting (dragging entire rows)
    if (rowIds.includes(active.id as string)) {
      if (over && rowIds.includes(over.id as string)) {
        const activeIndex = rowIds.indexOf(active.id as string);
        const overIndex = rowIds.indexOf(over.id as string);
  
        if (activeIndex !== overIndex) {
          // Create a map of row IDs to arrays of fields
          const rowFieldsMap: Record<string, Field[]> = {};
          fields.forEach(field => {
            const rowId = field.rowId || '';
            if (!rowFieldsMap[rowId]) {
              rowFieldsMap[rowId] = [];
            }
            rowFieldsMap[rowId].push(field);
          });
  
          // Get the order of rows
          const newRowOrder = arrayMove(rowIds, activeIndex, overIndex);
  
          // Create a new fields array with the updated row order
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
  
    const activeField = fields.find(f => f.id === active.id);
    if (!activeField) return;
  
    // Case 2: Dropping on a drop zone indicator to create new row
    if (visibleDropZone) {
      const newRowId = uuidv4();
      
      // Remove field from its original position
      const updatedFields = fields.filter(f => f.id !== activeField.id);
      
      // Create copy with new row ID
      const fieldWithNewRow = { 
        ...activeField, 
        rowId: newRowId, 
        order: 0 
      };
      
      // FIX: Properly insert at the correct position based on drop zone
      if (visibleDropZone === 'drop-zone-top') {
        // Insert at the beginning
        setFields([fieldWithNewRow, ...updatedFields]);
      } else {
        // Extract the row ID from the zone ID
        const afterRowIdMatch = visibleDropZone.match(/drop-zone-after-(.*)/);
        if (afterRowIdMatch && afterRowIdMatch[1]) {
          const afterRowId = afterRowIdMatch[1];
          
          // Find the index to insert after
          let insertIndex = -1;
          for (let i = 0; i < updatedFields.length; i++) {
            if (updatedFields[i].rowId === afterRowId) {
              insertIndex = i;
            }
          }
          
          // Insert the field after the last field of the specified row
          if (insertIndex >= 0) {
            updatedFields.splice(insertIndex + 1, 0, fieldWithNewRow);
            setFields(updatedFields);
          } else {
            // Fallback if row not found
            setFields([...updatedFields, fieldWithNewRow]);
          }
        } else {
          // Fallback
          setFields([...updatedFields, fieldWithNewRow]);
        }
      }
      return;
    }
  
    // Case 3: Horizontal sorting within same row
    const overField = fields.find(f => f.id === over?.id);
    if (overField && activeField.rowId === overField.rowId) {
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
        const reorderedFields = arrayMove(fieldsInRow, activeIndex, targetIndex)
          .map((field, index) => ({ ...field, order: index }));

        setFields(prev => {
          const otherFields = prev.filter(f => f.rowId !== activeField.rowId);
          const firstFieldIndex = prev.findIndex(f => f.rowId === activeField.rowId);
          return [
            ...otherFields.slice(0, firstFieldIndex),
            ...reorderedFields,
            ...otherFields.slice(firstFieldIndex)
          ];
        });
      }
      return;
    }
  
    // Case 4: Moving between existing rows
    if (overField) {
      const fieldsInTargetRow = fields.filter(f => f.rowId === overField.rowId);
      let newOrder = 0;
  
      if (dropTarget?.position === 'before') {
        // Insert before the over field
        newOrder = overField.order || 0;
        
        // Update orders of all fields in the target row
        setFields(prev => prev.map(f => {
          if (f.id === activeField.id) {
            return { ...f, rowId: overField.rowId, order: newOrder };
          }
          if (f.rowId === overField.rowId && (f.order || 0) >= newOrder) {
            return { ...f, order: (f.order || 0) + 1 };
          }
          return f;
        }));
      } else if (dropTarget?.position === 'after') {
        // Insert after the over field
        newOrder = (overField.order || 0) + 1;
        
        // Update orders of all fields in the target row
        setFields(prev => prev.map(f => {
          if (f.id === activeField.id) {
            return { ...f, rowId: overField.rowId, order: newOrder };
          }
          if (f.rowId === overField.rowId && (f.order || 0) > overField.order) {
            return { ...f, order: (f.order || 0) + 1 };
          }
          return f;
        }));
      } else {
        // Default to the end of the row
        newOrder = fieldsInTargetRow.length;
        setFields(prev => prev.map(f =>
          f.id === activeField.id
            ? { ...f, rowId: overField.rowId, order: newOrder }
            : f
        ));
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setVisibleDropZone(null);
    const fieldType = e.dataTransfer.getData("text/plain");
    if (!fieldType) return;

    const dropY = e.clientY;
    const dropElement = document.elementFromPoint(e.clientX, e.clientY);
    const rowElement = dropElement?.closest('[data-row-id]');

    // Case 1: Dropped directly on an existing row
    if (rowElement && rowElement.getAttribute('data-row-id')) {
      const targetRowId = rowElement.getAttribute('data-row-id') || '';
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
      return;
    }

    // Check if dropped on a drop zone indicator
    const dropZoneElement = dropElement?.closest('[data-drop-zone-id]');
    if (dropZoneElement) {
      const zoneId = dropZoneElement.getAttribute('data-drop-zone-id');
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
      
      // FIX: Properly handle insertion based on drop zone ID
      if (zoneId === 'drop-zone-top') {
        // Insert at the beginning
        setFields(prev => [newField, ...prev]);
      } else {
        // Extract row ID from the drop zone ID
        const afterRowIdMatch = zoneId?.match(/drop-zone-after-(.*)/);
        if (afterRowIdMatch && afterRowIdMatch[1]) {
          const afterRowId = afterRowIdMatch[1];
          
          // Find the index to insert after
          setFields(prev => {
            const updatedFields = [...prev];
            let insertIndex = -1;
            
            // Find the last field in the specified row
            for (let i = 0; i < updatedFields.length; i++) {
              if (updatedFields[i].rowId === afterRowId) {
                insertIndex = i;
              }
            }
            
            if (insertIndex >= 0) {
              // Insert after the last field of the specified row
              updatedFields.splice(insertIndex + 1, 0, newField);
            } else {
              // Fallback if row not found
              updatedFields.push(newField);
            }
            
            return updatedFields;
          });
        } else {
          // Fallback
          setFields(prev => [...prev, newField]);
        }
      }
      return;
    }

    // Case 3: Dropped between rows or in empty space (legacy fallback)
    const newRowId = uuidv4();
    
    // Determine insertion position based on vertical position
    const rowElements = Array.from(document.querySelectorAll('[data-row-id]'));
    let insertIndex = fields.length; // Default to the end
    let insertedBefore = false;
    
    for (let i = 0; i < rowElements.length; i++) {
      const el = rowElements[i];
      const rect = el.getBoundingClientRect();
      
      // If dropped above this row
      if (dropY < rect.top + rect.height / 2) {
        const rowId = el.getAttribute('data-row-id') || '';
        const firstFieldInRow = fields.find(f => f.rowId === rowId);
        if (firstFieldInRow) {
          const rowIndex = fields.findIndex(f => f.id === firstFieldInRow.id);
          if (rowIndex >= 0) {
            insertIndex = rowIndex;
            insertedBefore = true;
            break;
          }
        }
      }
    }

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

    setFields(prev => {
      const newFields = [...prev];
      newFields.splice(insertIndex, 0, newField);
      return newFields;
    });
  };

  const activeField = activeId ? fields.find(f => f.id === activeId) : null;
  const editingField = editingFieldId ? fields.find(f => f.id === editingFieldId) : null;

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={(e) => handleDragStart(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnd={(e) => handleDragEnd(e)}
        collisionDetection={rectIntersection}
      >
        <div
          id="form-layout-drop-zone"
          ref={dropZoneRef}
          className={`ml-72 p-4 min-h-[90vh] pb-52 w-auto transition-all duration-300 overflow-y-auto ${isDragging ? "bg-blue-50 border-2 border-dashed border-blue-500" : "bg-white"
            }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(true);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            const relatedTarget = e.relatedTarget as Node;
            if (!e.currentTarget.contains(relatedTarget)) {
              setIsDragging(false);
              setVisibleDropZone(null);
            }
          }}
        >
          <h3 className="mb-4 text-xl font-semibold text-slate-800">Form Layout</h3>
          
          {/* Drop zone at the very top */}
          {isDragging && <RowDropZone id="drop-zone-top" position="top" visible={visibleDropZone === "drop-zone-top"} />}
          
          {fields.length === 0 ? (
            <p className="text-slate-500">Drag and drop fields here to build your form.</p>
          ) : (
            <div className="space-y-2">
              <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
                {rowIds.map((rowId, index) => (
                  <div key={`row-container-${rowId}`}>
                    <RowContainer
                      rowId={rowId}
                      fields={groupedFields[rowId]}
                      editingFieldId={editingFieldId}
                      setFields={setFields}
                      startEditing={startEditing}
                      allFields={fields}
                      dropTarget={dropTarget}
                      activeId={activeId}
                      onDrop={handleDrop}
                      rowIds={rowIds}
                    />
                    
                    {/* Drop zone after each row */}
                    {isDragging && (
                      <RowDropZone 
                        id={`drop-zone-after-${rowId}`} 
                        position="after" 
                        visible={visibleDropZone === `drop-zone-after-${rowId}`} 
                      />
                    )}
                  </div>
                ))}
              </SortableContext>
            </div>
          )}
        </div>
        <DragOverlay style={{position:"fixed"}}>
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


interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onCancel?: () => void;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children, onCancel }) => {
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
          <button 
            onClick={handleClose} 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};


interface RowDropZoneProps {
  id: string;
  position: string;
  visible: boolean;
}

const RowDropZone: React.FC<RowDropZoneProps> = ({ id, position, visible }) => {
  return (
    <div 
      id={id}
      className={`h-2 transition-all ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
                bg-blue-200 border-2 border-double border-blue-500 
                rounded-md flex items-center justify-center my-1`}
      data-drop-zone-id={id}
      data-position={position}
    >
      {/* <div className="text-red-600  text-[12px]">drag it here</div> */}
    </div>
  );
};



interface RowContainerProps {
  rowId: string;
  fields: Field[];
  editingFieldId: string | null;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  startEditing: (fieldId: string) => void;
  allFields: Field[];
  dropTarget: { id: string; position: 'before' | 'after' | 'inside' } | null;
  activeId: string | null;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  rowIds: string[];
}

const RowContainer: React.FC<RowContainerProps> = ({
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
      data-row-index={rowIds.indexOf(rowId)}
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
        <div className={`w-[40vw] gap-2 ${fieldIds.length > 2 ?"grid grid-cols-3":"flex flex-wrap"}  relative`}>
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


interface SortableFieldProps {
  field: Field;
  isEditing: boolean;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  startEditing: (fieldId: string) => void;
  fields: Field[];
  dropTarget: { id: string; position: 'before' | 'after' | 'inside' } | null;
  isActiveField: boolean;
}

export const SortableField: React.FC<SortableFieldProps> = ({
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
      className={`relative p-4 rounded-md border ${isDropTarget ? 'border-blue-500 shadow-md' : 'border-gray-300'
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
        <div className="flex items-center gap-1">
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