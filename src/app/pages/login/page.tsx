"use client";
import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToken,
  clearAccessToken,
} from "@/src/features/redux/slice/authSlice";
import Axios from "@/src/features/services/axios";
import TextBox from "@/src/components/uiComponents/TextBox";
import Button from "@/src/components/uiComponents/Button";
import DatePicker from "@/src/components/uiComponents/DatePicker";
import { FieldWrapper } from "@/src/utils/formatters";

interface LoginFormData {
  username: string;
  password: string;
  dateOfBirth: Date | undefined;
}

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state?.auth?.accessToken);
  console.log("state", accessToken);
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
      dateOfBirth: undefined,
    },
    onSubmit: async ({ value }) => {
      console.log("val", value);
      // const loginData = { ...value, dateOfBirth: "1990-15-5" };
      //  console.log("loginData", loginData);
      // // const sampleData = {
      //   username: "jane_smith",
      //   password: "mypassword",
      //   date_of_birth: "1985-11-22",
      // };
      try {
        // const response = await Axios.post("/login", sampleData);
        // const data = response?.data?.accessToken;
        // console.log("DATA", data);
        // dispatch(setAccessToken(data));
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
          handleSubmit();
        }}
      >
        <Field name="username" validators={{}}>
          {(field) => (
            <TextBox
              label="Username"
              textField={field}
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
                  textField={field}
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
