"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { forgotPasswordSchema } from "../schemas";

export default function ForgotPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    // Mock API call or integrate with your backend
    try {
      // Replace with actual API logic
      console.log("Sending reset email to:", values.email);
      setIsEmailSent(true);
    } catch (error) {
      console.error("Error sending reset email:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md border-none shadow-none">
        <CardHeader className="text-center p-7">
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent className="p-7 space-y-4">
          {isEmailSent ? (
            <p className="text-center text-green-600">
              A password reset link has been sent to your email.
            </p>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size={"lg"}
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  Send Reset Link
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
