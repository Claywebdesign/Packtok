"use client";

import { useSignup } from "@/hooks/useSignup";
import { SignUpFormData, signUpSchema } from "@/schemas/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@packtok/ui/components/button";
import { Checkbox } from "@packtok/ui/components/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@packtok/ui/components/form";
import { Input } from "@packtok/ui/components/input";
import countries from "i18n-iso-countries";
// @ts-ignore – JSON import type declaration handled by compiler option
import enLocale from "i18n-iso-countries/langs/en.json";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import ReactSelect from "react-select";

// @ts-ignore – no types for this dynamic import; cast to any to allow arbitrary props
const PhoneInput = dynamic(() => import("react-phone-input-2" as any), {
  ssr: false,
}) as any;

// Register English names for countries
countries.registerLocale(enLocale);

export default function SignUpForm() {
  const { mutate, isPending } = useSignup();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: undefined,
      country: "",
      password: "",
      agreeToTerms: false,
    } as any,
  });

  // Country options for react-select
  const countryOptions = useMemo(() => {
    const names = countries.getNames("en", { select: "official" });
    return Object.entries(names).map(([code, name]) => ({
      value: code,
      label: `${name} (${code})`,
    }));
  }, []);

  const onSubmit = (data: SignUpFormData) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your full name"
                  className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent"
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
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your email"
                  className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneInput
                  country="in"
                  value={field.value ?? ""}
                  onChange={(value: any) =>
                    field.onChange(value ? `+${value}` : undefined)
                  }
                  autoFormat={false}
                  enableLongNumbers
                  enableSearch
                  placeholder="Enter phone number"
                  containerClass="relative w-full"
                  inputClass="!w-full !bg-transparent !border-0 !border-b !border-border !px-0 !pl-14 focus:!border-primary focus:!outline-none"
                  buttonClass="!absolute !left-0 !top-1/2 -translate-y-1/2 !bg-transparent !border-0 !pl-0"
                  inputProps={{ ref: undefined }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ReactSelect
                  classNamePrefix="react-select"
                  options={countryOptions}
                  value={
                    countryOptions.find((opt) => opt.value === field.value) ||
                    null
                  }
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(opt: any) => field.onChange(opt ? opt.value : "")}
                  isSearchable
                  placeholder="Select country"
                />
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
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Create a password"
                  className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
