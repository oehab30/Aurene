import React from 'react'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import { CreditCard, Package, Truck, ArrowRight } from 'lucide-react'

const OrderSummary: React.FC = () => {
  const { cartTotal } = useCart();
  const tax = cartTotal * 0.1;
  const delivery = cartTotal > 1000 ? 0 : 50;
  const total = cartTotal + tax + delivery;

  return (
    <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[80px] -mr-16 -mt-16" />

      <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
        Subtotal
        <div className="flex-1 h-px bg-gray-100 dark:bg-white/5" />
      </h2>

      <div className="space-y-6">
        <div className="space-y-4">
          <dl className="flex items-center justify-between">
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
               <Package className="w-3 h-3" />
               Raw Value
            </dt>
            <dd className="text-lg font-bold text-gray-900 dark:text-white tabular-nums">${cartTotal.toLocaleString()}</dd>
          </dl>

          <dl className="flex items-center justify-between">
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
               <CreditCard className="w-3 h-3" />
               Sales Tax (10%)
            </dt>
            <dd className="text-lg font-bold text-gray-900 dark:text-white tabular-nums">${tax.toLocaleString()}</dd>
          </dl>

          <dl className="flex items-center justify-between">
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
               <Truck className="w-3 h-3" />
               Gloval Logistics
            </dt>
            <dd className={`text-lg font-bold tabular-nums ${delivery === 0 ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
              {delivery === 0 ? 'COMPLIMENTARY' : `$${delivery.toLocaleString()}`}
            </dd>
          </dl>
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-white/5">
          <dl className="flex items-center justify-between">
            <dt className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Estimate Total</dt>
            <dd className="text-3xl font-black text-orange-500 tabular-nums">${total.toLocaleString()}</dd>
          </dl>
          <p className="text-[9px] text-gray-500 dark:text-gray-500 font-medium uppercase tracking-widest mt-2">Final pricing may vary based on shipping destination.</p>
        </div>

        <div className="space-y-3 pt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl transition-all group"
          >
            Authorize Payment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <div className="flex items-center justify-center gap-4 py-2">
             <div className="h-4 w-auto grayscale dark:invert opacity-40">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-full" />
             </div>
             <div className="h-4 w-auto grayscale dark:invert opacity-40">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-full" />
             </div>
             <div className="h-4 w-auto grayscale dark:invert opacity-40">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-full" />
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
