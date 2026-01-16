import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortOptions } from "./data";
import { useShopStore } from "@/store/useShopStore";

export function SortMenu() {
  const { filters, setSortBy } = useShopStore();

  return (
    <Select value={filters.sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-[180px] bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:border-orange-500">
        <span className="text-gray-400 mr-2">Sort:</span>
        <SelectValue placeholder="Sort Collection" />
      </SelectTrigger>

      <SelectContent className="bg-white dark:bg-[#151515] border-gray-200 dark:border-white/10 rounded-xl">
        <SelectGroup>
          <SelectLabel className="text-[10px] uppercase tracking-[0.2em] text-gray-400 p-2 border-b border-gray-100 dark:border-white/5 mb-1">Order By</SelectLabel>
          {sortOptions.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="text-xs font-medium focus:bg-orange-500/10 focus:text-orange-500 cursor-pointer p-2 rounded-lg m-1"
            >
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default SortMenu
