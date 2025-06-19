"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponses";
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
function VerifyAccount() {
  const router = useRouter();
  const param = useParams<{ username: string }>();
  //toast

  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });
  console.log("paramassss", param);
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    console.log("data", data);
    try {
      const response = await axios.post(`/api/verify-code/${param.username}`, {
        code: data.code,
        username : param.username
      });
      toast.success(response.data.message);
      router.push("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error("Verify error:", axiosError.response?.data || error);
      toast.error(
        axiosError.response?.data?.message ||
          "Unexpected error verifying account"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md space-y-8 bh-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">
            Enter the verification code sent to your email to activate your
            account.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default VerifyAccount;
