import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "@/components/auth/Loginform";
import RegisterForm from "@/components/auth/RegisterForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-orange-600/10 dark:bg-orange-600/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative w-full max-w-md perspective-1000">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, rotateY: -180, scale: 0.8 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 180, scale: 0.8 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 100, 
                damping: 20 
              }}
              style={{ backfaceVisibility: "hidden" }}
              className="w-full"
            >
              <LoginForm onSwitch={() => setIsLogin(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, rotateY: 180, scale: 0.8 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -180, scale: 0.8 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 100, 
                damping: 20 
              }}
              style={{ backfaceVisibility: "hidden" }}
              className="w-full"
            >
              <RegisterForm onSwitch={() => setIsLogin(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
