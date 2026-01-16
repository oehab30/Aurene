import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ticket, CheckCircle2 } from 'lucide-react'

const VoucherForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (code) {
      setApplied(true);
      setTimeout(() => setApplied(false), 3000);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2.5rem] p-8 space-y-6">
      <div className="flex items-center gap-3">
        <Ticket className="w-5 h-5 text-orange-500" />
        <h3 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.3em]">Redemption Code</h3>
      </div>
      
      <form onSubmit={handleApply} className="relative flex items-center">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="ENTER CODE"
          className="w-full bg-transparent border-b-2 border-gray-200 dark:border-white/10 py-3 text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest focus:outline-none focus:border-orange-500 placeholder:text-gray-300 dark:placeholder:text-gray-700 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-0 bottom-2 text-[10px] font-black text-orange-500 uppercase tracking-widest hover:translate-x-1 transition-all"
        >
          Apply
        </button>

        <AnimatePresence>
          {applied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-8 left-0 flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-widest"
            >
              <CheckCircle2 className="w-3 h-3" />
              Code Valid: 20% Reduction Applied
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      
      <p className="text-[9px] text-gray-400 dark:text-gray-500 font-medium leading-relaxed uppercase tracking-widest pt-2">
        Redeem gift cards or promotional identifiers here. Single use per archival acquisition.
      </p>
    </div>
  )
}

export default VoucherForm
