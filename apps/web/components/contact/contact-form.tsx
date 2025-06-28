"use client";

import { contactFormSchema } from "@/schemas/contact-form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@packtok/ui/components/form";
import { Button } from "@packtok/ui/components/button";
import { Input } from "@packtok/ui/components/input";
import { Textarea } from "@packtok/ui/components/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      console.log(values);
      setSubmitMessage("Message sent successfully!");
      form.reset();
    } catch (error) {
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">NAME</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    className="border-[1px] border-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">EMAIL</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="border-[1px] border-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">MESSAGE</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message..."
                    className="min-h-[120px] border-[1px] border-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-fit bg-black text-white cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>

      {submitMessage && (
        <div
          className={`text-center p-3 rounded-md ${
            submitMessage.includes("success")
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {submitMessage}
        </div>
      )}
    </div>
  );
}
