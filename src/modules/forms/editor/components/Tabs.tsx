import { cn } from "@/modules/ui/lib/utils";

interface TabProps {
  tabs: { id: string; label: string; icon: JSX.Element }[];
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Tabs = ({ tabs, activeView, setActiveView }: TabProps) => {
  return (
    <nav className="flex items-center pr-40 space-x-2 py-2  rounded-xl relative " aria-label="Tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveView(tab.id)}
          className={cn(
            "relative flex items-center px-4 py-2 text-base font-medium text-black transition-all duration-300",
            activeView === tab.id
              ? "text-black"
              : "text-black hover:text-blue-500"
          )}
        >
          {tab.icon && <div className="mr-2 h-5 w-5">{tab.icon}</div>}
          {tab.label}
          <span
            className={cn(
              "absolute left-0 bottom-0 h-[3px] w-full bg-green-500 rounded transition-all duration-300 ease-in-out",
              activeView === tab.id ? "scale-x-90" : "scale-x-0"
            )}
          />
        </button>
      ))}
    </nav>
  );
};