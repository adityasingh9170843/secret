"use client";
import React from "react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchema";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
      const result = await signIn('credentials',{
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if(result?.error) {
        toast.error(result.error);
      }
      if(result?.url) {
        toast.success("Signed in successfully");
        router.push("/");
      }
    }catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message || "Error signing in");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md space-y-8 bh-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Sign In to Secret
          </h1>
          <p className="mb-4">
            Enter your email and password to access your account.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sign In</FormLabel>
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
                  <FormLabel>Sign In</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Sign In</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Sign;
