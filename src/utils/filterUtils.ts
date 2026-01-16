// Utility to extract unique filter options from products
export const extractUniqueCategories = (products: any[]) => {
  const categories = products
    .map(product => product.category)
    .filter((category, index, self) => category && self.indexOf(category) === index)
    .sort();
  
  return categories.map(category => ({
    name: category,
    href: '#'
  }));
};

export const extractUniqueMaterials = (products: any[]) => {
  const materials = products
    .map(product => product.material)
    .filter((material, index, self) => material && self.indexOf(material) === index)
    .sort();
  
  return materials.map(material => ({
    value: material,
    label: material,
    checked: false
  }));
};

export const extractUniqueColors = (products: any[]) => {
  const colors = products
    .map(product => product.color?.toLowerCase())
    .filter((color, index, self) => color && self.indexOf(color) === index)
    .sort();
  
  // Map colors to their CSS classes
  const colorMap: Record<string, string> = {
    'white': 'bg-white checked:outline-gray-400',
    'gray': 'bg-gray-200 checked:outline-gray-400',
    'grey': 'bg-gray-200 checked:outline-gray-400',
    'black': 'bg-black checked:outline-gray-900',
    'purple': 'bg-purple-600 checked:outline-gray-900',
    'blue': 'bg-blue-500 checked:outline-gray-900',
    'red': 'bg-red-500 checked:outline-gray-900',
    'green': 'bg-green-500 checked:outline-gray-900',
    'yellow': 'bg-yellow-400 checked:outline-gray-900',
    'pink': 'bg-pink-500 checked:outline-gray-900',
    'orange': 'bg-orange-500 checked:outline-gray-900',
    'brown': 'bg-amber-700 checked:outline-gray-900',
    'gold': 'bg-yellow-500 checked:outline-gray-900',
    'silver': 'bg-gray-300 checked:outline-gray-400',
  };
  
  return colors.map(color => ({
    id: color,
    name: color.charAt(0).toUpperCase() + color.slice(1),
    classes: colorMap[color] || 'bg-gray-400 checked:outline-gray-900'
  }));
};

export const getPriceRange = (products: any[]) => {
  if (products.length === 0) return { min: 0, max: 5000 };
  
  const prices = products.map(product => product.price || 0);
  const min = Math.floor(Math.min(...prices));
  const max = Math.ceil(Math.max(...prices));
  
  return { min, max };
};
