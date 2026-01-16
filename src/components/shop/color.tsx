import React from 'react';
import classNames from 'classnames';
import { useShopStore } from '@/store/useShopStore';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { extractUniqueColors } from '@/utils/filterUtils';

function Color() {
  const { filters, setColor } = useShopStore();
  
  // Fetch products to generate dynamic colors
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });
  
  const dynamicColors = extractUniqueColors(products);

  return (
    <fieldset aria-label="Choose a color" className="mt-2 w-full">
      <div className="flex flex-wrap items-center gap-3">
        {dynamicColors.map((color) => (
          <div
            key={color.id}
            className={classNames(
              "flex rounded-full p-0.5 transition-all duration-300",
              filters.color === color.id ? "ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-[#0a0a0a]" : "ring-1 ring-gray-200 dark:ring-white/10"
            )}
          >
            <button
              type="button"
              onClick={() => setColor(filters.color === color.id ? null : color.id)}
              aria-label={color.name}
              className={classNames(
                color.classes.split(' ')[0], // Get background color class
                'h-6 w-6 rounded-full cursor-pointer hover:scale-110 transition-transform'
              )}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {filters.color ? `Selected: ${filters.color}` : 'All Colors'}
        </span>
        {filters.color && (
          <button 
            type="button"
            onClick={() => setColor(null)}
            className="text-[10px] text-orange-500 font-bold uppercase tracking-widest hover:underline"
          >
            Clear
          </button>
        )}
      </div>
    </fieldset>
  );
}

export default Color;
