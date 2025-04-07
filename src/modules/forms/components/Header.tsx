// "use client"

// import { Button } from "@/modules/ui/components/button";
// import { Input } from "@/modules/ui/components/input";
// import { ArrowLeftIcon } from "lucide-react";


// export const Header = () => {
//     return (
//       <div className="border-b border-slate-200 bg-[#72b2da] px-5 py-2.5 sm:flex sm:items-center sm:justify-between">
//         <div className="flex h-full items-center space-x-2 whitespace-nowrap">
//           <Button size="sm" variant="secondary" className="h-full">
//             <ArrowLeftIcon />
//             Back
//           </Button>
//           <p className="hidden pl-4font-semibold md:block">ubib /</p>
//           <Input
//             defaultValue="Product Market Fit (Superhuman)"
//             className="h-8 w-72 border-white py-0 hover:border-slate-200"
//           />
//         </div>


//         <div className="mt-3 flex sm:ml-4 sm:mt-0">
//           <Button variant="secondary" size="sm" className="mr-3" type="submit">
//             Save
//           </Button>
//           <Button className="mr-3" size="sm">
//             Save & Close
//           </Button>
//         </div>
//       </div>
//     );
//   };


"use client";

import { Button } from "@/modules/ui/components/button";
import { Input } from "@/modules/ui/components/input";
import { ArrowLeftIcon } from "lucide-react";
import { Tabs } from "@/modules/forms/editor/components/Tabs";

export const Header = ({
  tabs,
  activeView,
  setActiveView,
}: {
  tabs: { id: string; label: string; icon: JSX.Element }[];
  activeView: string;
  setActiveView: (view: string) => void;
}) => {
  return (
    <div className="border-b border-slate-200 bg-white px-5 py-3 sm:flex sm:items-center sm:justify-between">
      {/* Left Section */}
      <div className="flex h-full items-center space-x-3 whitespace-nowrap">
        <Button size="sm" variant="secondary" className="h-full">
          <ArrowLeftIcon />
          Back
        </Button>
        <p className="hidden pl-4 font-semibold md:block">ubib /</p>
        <Input
          defaultValue="Product Market Fit (Superhuman)"
          className="h-8 w-72 border-black py-0 hover:border-slate-200"
        />
      </div>

      {/* Tabs Section */}
      <div className="mt-3 flex sm:ml-4 sm:mt-0">
        <Tabs tabs={tabs} activeView={activeView} setActiveView={setActiveView} />
      </div>

      {/* Right Section (Buttons) */}
      <div className="mt-3 flex sm:ml-4 sm:mt-0">
        <Button variant="secondary" size="sm" className="mr-3" type="submit">
          Save
        </Button>
        <Button className="mr-3" size="sm">
          Save & Close
        </Button>
      </div>
    </div>
  );
};