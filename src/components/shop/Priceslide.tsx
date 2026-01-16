import React from 'react'
import { Slider } from "@/components/ui/slider"
import { useShopStore } from '@/store/useShopStore'

function Priceslide() {
  const { filters, setPriceRange } = useShopStore();

  return (
    <div className="space-y-4 px-1">
      <Slider 
        value={[filters.priceRange[0], filters.priceRange[1]]} 
        max={5000} 
        step={100}
        onValueChange={(val) => setPriceRange([val[0], val[1]])}
      />
      <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <span>${filters.priceRange[0]}</span>
        <span>${filters.priceRange[1]}</span>
      </div>
    </div>
  )
}

export default Priceslide