"use client";
import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import TextBox from "@/src/components/uiComponents/TextBox";
import Button from "@/src/components/uiComponents/Button";
import DatePicker from "@/src/components/uiComponents/DatePicker";
import { FieldWrapper } from "@/src/utils/formatters";

interface LoginFormData {
  email: string;
  password: string;
  dateOfBirth: Date | undefined;
}

export default function LoginForm() {
  const router = useRouter();
  const { Field, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      dateOfBirth: undefined,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      router.push("/pages/acknowledgement");
    },
  });

  return (
    <div className="container *:space-y-5 min-h-100   align-middle justify-center max-w-md mx-auto px-10 border border-gray-300 rounded-lg shadow-md p-8">
      <div className="text-center pb-10 text-xl text-blue-800"> Login </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Field name="email" validators={{}}>
          {(field) => (
            <TextBox
              label="Username"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              variant={"primary"}
              placeholder="username"
            />
          )}
        </Field>

        <Field
          name="password"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Password is required";
              if (value.length < 8) return "At least 8 characters";
              if (!/[A-Z]/.test(value))
                return "Include at least one uppercase letter";
              if (!/[0-9]/.test(value)) return "Include at least one number";
              return undefined;
            },
          }}
        >
          {(field) => (
            <FieldWrapper
              label="Password"
              error={
                field.state.meta.isTouched && field.state.meta.errors.length
                  ? String(field.state.meta.errors[0])
                  : undefined
              }
            >
              <div className="relative">
                <TextBox
                  passwordField={true}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  variant={"primary"}
                  placeholder="password"
                />
              </div>
            </FieldWrapper>
          )}
        </Field>

        <Field name="dateOfBirth">
          {(field) => (
            <DatePicker
              field={field}
              label="Date of birth"
              value={field.state.value}
            />
          )}
        </Field>

        <div className="flex items-center justify-center">
          <Button variant={"primary"} onClick={handleSubmit}>
            Login
          </Button>
        </div>
        <div className="text-sm text-center cursor-pointer hover:text-blue-600 focus:outline-none focus:underline">
          Forgot Password?
        </div>
      </form>
    </div>
  );
}
