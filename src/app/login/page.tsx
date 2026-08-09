"use client";
import { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useDispatch, useStore } from "react-redux";
import {
  setAccessToken,
  clearAccessToken,
} from "@/src/features/redux/slice/authSlice";
import Axios from "@/src/features/services/axios";
import TextBox from "@/src/components/uiComponents/TextBox";
import Button from "@/src/components/uiComponents/Button";
import DatePicker from "@/src/components/uiComponents/DatePicker";
import { FieldWrapper } from "@/src/utils/formatters";
import { useAppSelector } from "@/src/features/redux/hooks";

import { z } from "zod";

interface LoginFormData {
  username: string;
  password: string;
  dateOfBirth: Date | string;
}
const dobSchema = z.object({
  dateOfBirth: z.date({
    error: (issue) => (issue.input === undefined ? "Required" : "Invalid date"),
  }),
});
export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useStore();
  const accessToken = useAppSelector((state) => state?.auth?.accessToken);
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
      dateOfBirth: "",
    },
    onSubmit: async ({ value }) => {
      // const loginData = { ...value, dateOfBirth: "1990-15-5" };
      //  console.log("loginData", loginData);
      // const sampleData = {
      //   username: "firstUser",
      //   password: "firstUser123",
      //   dateOfBirth: "08/14/1995",
      // };
      try {
        const response = await Axios.post("/api/auth", value);
        const data = response?.data;
        const authData = {
          accessToken: data?.accessToken,
          userName: data?.userName,
          isAuthenticated: true,
        };
        dispatch(setAccessToken(authData));
        router.push("/pages/welcome");
      } catch (error) {
        console.log("Login failed", error);
      }
    },
  });

  return (
    <div className="container *:space-y-5 min-h-100   align-middle justify-center max-w-md mx-auto px-10 border border-gray-300 rounded-lg shadow-md p-8">
      <div className="text-center pb-10 text-xl text-blue-800"> Login </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <Field
          name="username"
          validators={{
            onChange: z
              .string()
              .trim()
              .min(1, "Username cant be empty")
              .min(2, "Minimum 2 characters"),
          }}
        >
          {(field) => (
            <FieldWrapper
              error={
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? field.state.meta.errors[0]?.message
                  : undefined
              }
            >
              <TextBox
                label="Username"
                textField={field}
                variant={"primary"}
                placeholder="username"
              />
            </FieldWrapper>
          )}
        </Field>

        <Field
          name="password"
          validators={{
            onChange: z
              .string()
              .trim()
              .min(1, "Password cant be empty")
              .min(8, "Password is too short")
              .refine(
                (val) => /^(?=.*\d)(?=.*[A-Z]).+$/.test(val),
                "Include atleast one number and uppercase letter",
              ),
          }}
        >
          {(field) => (
            <div className="relative">
              <FieldWrapper
                label="Password"
                error={
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0
                    ? field.state.meta.errors[0]?.message
                    : undefined
                }
              >
                <TextBox
                  passwordField={true}
                  textField={field}
                  variant={"primary"}
                  placeholder="password"
                />
              </FieldWrapper>
            </div>
          )}
        </Field>

        <Field
          name="dateOfBirth"
          validators={{
            onSubmit: ({ value }) =>
              !value ? "Date cannot be empty" : undefined,
          }}
        >
          {(field) => (
            <FieldWrapper
              error={
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? field.state.meta.errors[0]
                  : undefined
              }
            >
              <DatePicker
                field={field}
                label="Date of birth"
                placeholder="Choose date"
              />
            </FieldWrapper>
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
