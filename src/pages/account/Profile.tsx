import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    
    if (isAdmin) {
      // Redirect admin users to dashboard
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          User Profile
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Regular user profile page - Coming soon!
        </p>
      </div>
    </div>
  );
}

export default Profile;