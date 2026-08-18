import { FieldWrapper } from "@/src/utils/formatters";
import TextBox from "@/src/components/uiComponents/TextBox";
import Button from "@/src/components/uiComponents/Button";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import Axios from "@/src/features/services/axios";
import axios from "axios";
import { useState } from "react";
import { useRouter, redirect } from "next/navigation";

type ErrorMessageProp = {
  message: string;
  color: string;
};

interface ResetProp {
  setResetPassword: (resetPassword: boolean) => void;
  setLoginErrorMessage: (errorMessage: ErrorMessageProp) => void;
}
const passwordSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, "Username cant be empty")
      .min(2, "Minimum 2 characters"),
    password: z
      .string()
      .trim()
      .min(1, "Password cant be empty")
      .min(8, "Password is too short"),
    confirmPassword: z
      .string()
      .trim()
      .min(1, "Password cant be empty")
      .min(8, "Password is too short"),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export default function ResetPassword({
  setResetPassword,
  setLoginErrorMessage,
}: ResetProp) {
  // 2. Initialize TanStack Form with Zod adapter
  const [errorMessage, setErrorMessage] = useState({ message: "", color: "" });
  const router = useRouter();
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: passwordSchema,
    },
    onSubmit: async ({ value }) => {
      // Handle password reset request logic here
      const resetData = {
        username: value?.username,
        newPassword: value?.password,
      };
      try {
        const response = await Axios.post("/api/resetPassword", resetData);
        const data = response?.data;
        setLoginErrorMessage({ message: data?.message, color: "green" });
        setResetPassword(false);
        //setLoginErrorMessage(data?.message);
        router.push("/login");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("ERROR", error?.response);
          const message = error?.response?.data?.message;
          setErrorMessage({ message: message, color: "red" });
        } else {
          console.log("Login failed", error);
        }
      }
    },
  });
  const extractError = (error: unknown) => {
    return typeof error === "object" && error !== null && "message" in error
      ? (error as { message: string }).message
      : (error as string | undefined);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          errorMessage?.message
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {errorMessage && (
          <div
            className={`text-xs whitespace-pre-line text-${errorMessage?.color}-500 bg-${errorMessage?.color}-100 p-3`}
          >
            {errorMessage?.message}
          </div>
        )}
      </div>
      <Field name="username">
        {(field) => (
          <FieldWrapper
            error={
              field.state.meta.isTouched && field.state.meta.errors.length > 0
                ? extractError(field.state.meta.errors[0])
                : ""
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
      <Field name="password">
        {(field) => (
          <div className="relative">
            <FieldWrapper
              label="Password"
              error={
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? extractError(field.state.meta?.errors[0])
                  : ""
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
      <Field name="confirmPassword">
        {(field) => (
          <div className="relative">
            <FieldWrapper
              label="Confirm Password"
              error={
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? extractError(field.state.meta.errors[0])
                  : ""
              }
            >
              <TextBox
                id="confirmPassword"
                passwordField={true}
                textField={field}
                variant={"primary"}
                placeholder="password"
              />
            </FieldWrapper>
          </div>
        )}
      </Field>
      <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={!canSubmit}
              onClick={handleSubmit}
              primary={true}
            >
              {isSubmitting ? "Sending..." : "Reset password"}
            </Button>
          </div>
        )}
      </Subscribe>
    </form>
  );
}
