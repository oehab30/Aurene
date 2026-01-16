import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock, Mail } from "lucide-react";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof schema>;

interface LoginFormProps {
  onSwitch: () => void;
}

export default function LoginForm({ onSwitch }: LoginFormProps) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormInputs) => {
      const response = await api.post("/auth/sign-in", data);
      return { response: response.data, loginData: data };
    },
    onSuccess: ({ response, loginData }) => {
      console.log("Login successful:", response);
      if (response?.token) {
        localStorage.setItem("token", response.token);
        
        // Check for specific admin credentials
        if (loginData.email === "t@t.tt" && loginData.password === "Secret@1") {
            localStorage.setItem("isAdmin", "true");
            navigate("/dashboard");
        } else {
            localStorage.removeItem("isAdmin");
            navigate("/"); // Redirect regular users to home
        }
      }
    },
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="bg-white/70 dark:bg-white/10 backdrop-blur-2xl border border-gray-200 dark:border-white/20 shadow-2xl rounded-[2.5rem] p-10 flex flex-col gap-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tighter">
            Welcome <span className="text-orange-500">Back</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Enter your credentials to access your portal
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
              Auth Identity
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors h-5 w-5" />
              <input
                {...register("email")}
                type="email"
                placeholder="concierge@aurene.com"
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none transition-all text-gray-900 dark:text-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1 text-left block">
              Security Key
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors h-5 w-5" />
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none transition-all text-gray-900 dark:text-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isPending ? <Loader2 className="animate-spin mx-auto" /> : "Authorize"}
        </button>

        <div className="flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
          <span className="text-[10px] uppercase tracking-widest text-gray-400">Social Access</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="flex items-center justify-center py-3 border border-gray-200 dark:border-white/10 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group">
             <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.345 3.58c-2.136-1.99-4.909-3.218-7.345-3.218C7.11 0 3.34 3.082 1.582 7.11l3.684 2.655z"/>
                <path fill="#4285F4" d="M23.673 12.218c0-.845-.073-1.663-.209-2.454h-11.464v4.636h6.545a5.592 5.592 0 0 1-2.427 3.664l3.864 3c2.264-2.09 3.691-5.173 3.691-8.846z"/>
                <path fill="#FBBC05" d="M5.266 14.235 1.582 16.89c1.758 4.028 5.528 7.11 10.418 7.11 2.89 0 5.482-1.073 7.345-2.9l-3.864-3c-1.036.7-2.382 1.11-3.481 1.11-2.318 0-4.3-1.564-5-3.71l-3.734 2.835z"/>
                <path fill="#34A853" d="M12 24c3.082 0 5.673-1.018 7.564-2.764l-3.864-3A4.694 4.694 0 0 1 12 19.309c-2.318 0-4.3-1.564-5-3.71l-3.684 2.655C5.073 21.018 8.245 24 12 24z"/>
             </svg>
          </button>
          <button type="button" className="flex items-center justify-center py-3 border border-gray-200 dark:border-white/10 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group">
             <svg className="w-5 h-5 text-gray-900 dark:text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.011-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
             </svg>
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          New here?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-orange-500 font-bold hover:underline"
          >
            Create Private Account
          </button>
        </p>
      </form>
    </div>
  );
}
