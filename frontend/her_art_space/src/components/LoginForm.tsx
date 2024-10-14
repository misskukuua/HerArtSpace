"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Link, useRouter } from "@tanstack/react-router";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";

import useApiValidationErrors from "@/hooks/useApiValidationErrors";

const baseSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  //   email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
//   confirmPassword: z
//     .string()
//     .min(1, { message: "Password confirmation cannot be empty" }),
});

// const formSchema = baseSchema.superRefine((data, ctx) => {
//   if (data.password !== data.confirmPassword) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Passwords do not match",
//       path: ["confirmPassword"], // This will attach the error to the confirmPassword field
//     });
//   }
// });

type LoginFormValues = z.infer<typeof baseSchema>;

const schemaFields = baseSchema.keyof().enum;
const apiFieldMap = {
  name: schemaFields.name,
  //   email: schemaFields.email,
  password: schemaFields.password,
//   confirmPassword: schemaFields.confirmPassword,
};

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  // const { id, name, formItemId, formDescriptionId, formMessageId, error } = useFormField();

  // Use useForm to get form methods

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(baseSchema), // Integrate Zod for schema validation
    defaultValues: {
      name: "",
      //   email: "",
      password: "",
    //   confirmPassword: "",
    },
    mode: "onChange", // This will trigger validation on change
  });

  const { setApiValidationErrors } = useApiValidationErrors(
    apiFieldMap,
    form.setError
  );

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    alert("Login button works");
    try {
      const response = await axios.post(
        "http://localhost:5050/auth/login",
        data
      );

      console.log("This is the response from the server: ", response);

      // Extract the token from the response
      const { token } = response.data;

      // Store the token in localStorage or any state management library
      localStorage.setItem("token", token);

      // Optionally, set user data in context or state management if needed
      // e.g., dispatch(setUser(response.data.user));

      console.log("This is the data the user submitted: ", data);

      // Handle successful response
      console.log("User created:", await response.data);
      setApiValidationErrors(""); // Clear any previous server errors

      //let user know account creation was successful
      alert("Login is successful");

      router.navigate({ to: "/userprofile" });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Registration error:", error.response.data);

        if (
          error.response.data.errors &&
          typeof error.response.data.errors === "object"
        ) {
          // Handle field-specific errors
          setApiValidationErrors(error.response.data.errors);
        } else {
          // Handle general error
          setServerError(
            error.response.data.message || "An unknown error occurred"
          );
        }
      } else {
        console.error("Error during registration:", error);
        setServerError("Network error, please try again later.");
      }
    }
  };

  // const handleBlur = useCallback(
  //   async (event) => {
  //     const fieldName = event.target.name; // Get the name of the input field
  //     console.log("Input blurred. Current value:", event.target.value);

  //     // Trigger validation for the specific field that lost focus
  //     await form.trigger(fieldName);
  //   },
  //   [form.trigger]
  // );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" bg-white px-16 outline outline-none space-y-8"
          noValidate
        >
          {/* {serverError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{serverError}</span>
            </div>
          )} */}
          <div className="flex flex-col items-center justify-center">
            <p className="font-kumar text-5xl leading-tight text-secondary-foreground font-normal mt-8 mb-3">
              HerArtSpace
            </p>
            <div className="flex flex-col items-center font-montserrat text-3xl font-bold text-accent-foreground">
              <p>Login to proceed</p>
            </div>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>What should we call you</FormLabel> */}
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                  </FormDescription> */}
                <FormMessage />
                {/* {form.formState.errors.name && (
                    <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                  )} */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Create a password</FormLabel> */}
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  Use 8 or more character with a mix of letters, numbers and symbols
                  </FormDescription> */}
                <FormMessage />
                {/* {form.formState.errors.password && (
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                )} */}
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create a password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                        Use 8 or more character with a mix of letters, numbers and symbols
                        </FormDescription>
                <FormMessage />
                {form.formState.errors.confirmPassword && (
                  <FormMessage>
                    {form.formState.errors.confirmPassword?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          /> */}
          {/* Show Password Checkbox */}
          <div className="flex items-center">
            <Checkbox
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
              onCheckedChange={(checked) => setShowPassword(!!checked)} // Update showPassword state based on checkbox
            />
            <label className="ml-2 text-sm">Show Password</label>
          </div>
          <Button
            className="w-full outline bg-primary hover:text-primary hover:bg-secondary"
            type="submit"
          >
            Login
          </Button>
          <div>
            <span className="flex justify-center">
              Don't have an account?
              <Link to="/signup" className="ml-1 bg-transparent text-primary">
                Sign up
              </Link>
            </span>
          </div>
          <div className="mt-0 mb-0 p-0 flex items-center text-xs">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-1 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex w-full gap-0 ">
            <Button
              className="w-full bg-white text-accent-foreground hover:bg-primary hover:text-primary-foreground mb-4"
              type="submit"
            >
              Login with gmail
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
