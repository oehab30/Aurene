import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock, Mail, User } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Full name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Security key too short"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Security keys do not match",
  path: ["confirmPassword"],
});

type RegisterInputs = z.infer<typeof schema>;

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterInputs) => api.post("/auth/sign-up", data),
    onSuccess: () => navigate("/login"),
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="bg-white/70 dark:bg-white/10 backdrop-blur-2xl border border-gray-200 dark:border-white/20 shadow-2xl rounded-[2.5rem] p-10 flex flex-col gap-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tighter">
            Join <span className="text-orange-500">Auréne</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Experience exclusive luxury and collections
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors h-5 w-5" />
              <input
                {...register("name")}
                placeholder="Alexander Vance"
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none transition-all text-gray-900 dark:text-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
              Auth Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors h-5 w-5" />
              <input
                {...register("email")}
                placeholder="luxury@aurene.com"
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none transition-all text-gray-900 dark:text-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <input
                {...register("password")}
                type="password"
                placeholder="Key"
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-4 outline-none transition-all text-gray-900 dark:text-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>
            <div className="space-y-2">
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm"
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-4 outline-none transition-all text-gray-900 dark:text-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>
          </div>
          {(errors.password || errors.confirmPassword) && (
            <p className="text-red-500 text-xs ml-1">{errors.password?.message || errors.confirmPassword?.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
        >
          {isPending ? <Loader2 className="animate-spin mx-auto" /> : "Establish Account"}
        </button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Registered before?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-orange-500 font-bold hover:underline"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
}
