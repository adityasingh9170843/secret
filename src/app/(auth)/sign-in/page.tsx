"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchema";
import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const Sign = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result?.error) {
        toast.error(result.error);
      }
      if (result?.url) {
        toast.success("Signed in successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message || "Error signing in");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">
      {/* Decorative Background SVGs */}
      <svg
        className="absolute top-[-40px] left-[-40px] w-64 h-64 text-purple-200 opacity-30"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M21 15a2 2 0 0 1-2 2H9l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
      </svg>
      <svg
        className="absolute bottom-[-40px] right-[-40px] w-64 h-64 text-blue-200 opacity-30"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20 2H4a2 2 0 0 0-2 2v14l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
      </svg>

      <div className="w-full max-w-md space-y-8 bg-white/70 backdrop-blur-md border border-gray-300 rounded-xl shadow-xl p-8 z-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-indigo-700">
            Sign In to Secret
          </h1>
          <p className="mb-4 text-gray-600">
            Enter your email and password to access your account.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Sign In
            </Button>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a
                className="text-indigo-600 hover:underline"
                href="/sign-up"
              >
                Sign Up
              </a>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Sign;
