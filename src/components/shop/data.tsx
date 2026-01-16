'use client'

// Shared data and helpers for Categories components
export const availabilityFilters = [
  {
    id: "availability",
    name: "Availability",
    options: [
      { value: "instock", label: "In Stock", checked: false },
      { value: "outofstock", label: "Out of Stock", checked: true },
    ],
  },
];



export const sortOptions = [
  { name: "Best seller", value: "Best seller" },
  { name: "Price: Low to High", value: "low-high" },
  { name: "Price: High to Low", value: "high-low" },
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];


export const subCategories = [
  { name: 'Watches', href: '#' },
  { name: 'Bags', href: '#' },
  { name: 'Rings ', href: '#' },
  { name: 'Bracelet', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]

export const filters = [
  {
    id: 'Material',
    name: 'Material',
    options: [
      { value: 'Gold', label: 'Gold', checked: false },
      { value: 'Silver', label: 'Silver', checked: false },
      { value: 'Stainless Steel', label: 'Stainless Steel', checked: true },
    ],
  },
]


 export const productColor = {
    colors: [
      { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
      { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
      { id: 'black', name: 'Black', classes: 'bg-black checked:outline-gray-900' },
      { id: 'purple', name: 'Purple', classes: 'bg-purple-600 checked:outline-gray-900' },
      { id: 'blue', name: 'Blue', classes: 'bg-blue-500 checked:outline-gray-900' },
    ],
  };

export function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
