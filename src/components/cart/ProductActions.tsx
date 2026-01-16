import React from 'react'

/**
 * ProductActions Component
 * Displays action buttons for cart items (Add to Favorites, Remove)
 */

const ProductActions: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Add to Favorites Button */}
      <button
        type="button"
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
      >
        <svg
          className="me-1.5 h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>
        Add to Favorites
      </button>

      {/* Remove Item Button */}
      <button
        type="button"
        className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
      >
        <svg
          className="me-1.5 h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
        Remove
      </button>
    </div>
  )
}

export default ProductActions
