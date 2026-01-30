/**
 * Generated from Figma
 * Source: https://www.figma.com/design/VO9w8SEvI6yY3uFgDuLfwo/?node-id=4067-5566
 * Node: 4067:5566
 * Component: Frame101
 * Generated: 2026-01-30
 */

import { Search, ChevronDown, Plus } from 'lucide-react';
import  AssistantCard  from "@/components/figmaUI/AssistantCard";

export default function Frame101() {
  return (
    <div className="flex flex-col gap-4 items-start w-full h-full">
      {/* Header Section */}
      <div className="flex flex-wrap gap-6 items-center justify-between w-full">
        {/* Title and Description */}
        <div className="flex flex-col gap-2 items-start text-gray-700">
          <p className="font-semibold text-2xl leading-none tracking-tight">
            All Experts
          </p>
          <p className="text-sm text-gray-700 leading-5">
            Browse and create experts to get more done.
          </p>
        </div>

        {/* Action Row */}
        <div className="flex gap-2 items-start">
          {/* Search Input */}
          <div className="flex gap-2 items-center h-9 w-[280px] px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="flex-1 text-sm text-gray-500 leading-5">
              Search Experts
            </span>
          </div>

          {/* Filter Button */}
          <button className="flex gap-2 items-center justify-center h-9 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm">
            <span className="text-sm font-medium text-slate-800 leading-5">
              All Experts
            </span>
            <ChevronDown className="w-6 h-6 text-slate-800" />
          </button>

          {/* Create Button */}
          <button className="flex gap-2 items-center justify-center h-9 px-4 py-2 bg-[#0056a7] rounded-full shadow-sm">
            <Plus className="w-6 h-6 text-white" />
            <span className="text-sm font-medium text-white leading-5">
              Create Expert
            </span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap gap-6 items-start w-full">
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
      </div>
    </div>
  );
}
