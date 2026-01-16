import React from 'react'

/**
 * QuantityControls Component
 * Displays increment/decrement buttons and quantity input for cart items
 *
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the quantity input
 * @param {number} props.quantity - Current quantity value
 * @param {function} props.onQuantityChange - Callback when quantity changes
 */

interface QuantityControlsProps {
  id: string
  quantity: number
  onQuantityChange?: (quantity: number) => void
}

const QuantityControls: React.FC<QuantityControlsProps> = ({ id, quantity, onQuantityChange }) => {
  return (
    <div className="flex items-center">
      {/* Decrement Button - Decreases quantity by 1 */}
      <button
        type="button"
        id={`decrement-button-${id}`}
        data-input-counter-decrement={id}
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
      >
        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
        </svg>
      </button>

      {/* Quantity Input - Display and edit current quantity */}
      <input
        type="text"
        id={id}
        data-input-counter
        className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
        placeholder=""
        value={quantity}
        required
      />

      {/* Increment Button - Increases quantity by 1 */}
      <button
        type="button"
        id={`increment-button-${id}`}
        data-input-counter-increment={id}
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
      >
        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
        </svg>
      </button>
    </div>
  )
}

export default QuantityControls
