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
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Password confirmation cannot be empty" }),
});

const formSchema = baseSchema.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"], // This will attach the error to the confirmPassword field
    });
  }
});

type SignupFormValues = z.infer<typeof formSchema>;

const schemaFields = baseSchema.keyof().enum;
const apiFieldMap = {
  name: schemaFields.name,
  email: schemaFields.email,
  password: schemaFields.password,
  confirmPassword: schemaFields.confirmPassword,
};

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  // const { id, name, formItemId, formDescriptionId, formMessageId, error } = useFormField();

  // Use useForm to get form methods

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema), // Integrate Zod for schema validation
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // This will trigger validation on change
  });

  const { setApiValidationErrors } = useApiValidationErrors(
    apiFieldMap,
    form.setError
  );

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/auth/signup",
        data
      );

      console.log("This is the response from the server: ", response);

      // const token = response.data.token;

      console.log("This is the data the user submitted: ", data);

      // Handle successful response
      console.log("User created:", await response.data);
      setApiValidationErrors(""); // Clear any previous server errors

      //let user know account creation was successful
      alert("Your account has been created");

      // Redirect to the login page after successful signup
      router.navigate({ to: "/login" });
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
          console.log(
            "this is the server error in the state object: ",
            serverError
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

  const handleLogin = () => {
    // send user to login page
    navigate("/login");
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white px-16 py-4 space-y-8"
          noValidate
        >
          {/* {serverError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{serverError}</span>
            </div>
          )} */}
          <div className="flex flex-col items-center justify-center">
            <p className="font-kumar text-5xl leading-tight text-secondary-foreground font-normal mt-4 mb-3">
              HerArtSpace
            </p>
            <span className="flex flex-col items-center font-montserrat text-3xl font-bold text-accent-foreground">
              <p>Create acccount to</p>
              <p>proceed</p>
            </span>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>What's your email</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="E-mail"
                    {...field}
                    // onBlur={(e) => {
                    //   field.onBlur(); // This ensures react-hook-form's onBlur functionality is preserved
                    //   handleBlur(e); // This is our custom onBlur handler
                    // }}
                  />
                </FormControl>
                {/* <FormDescription>
                  Enter a valid email address
                  </FormDescription> */}
                <FormMessage />
                {/* {form.formState.errors.email && (
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Create a password</FormLabel> */}
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                        Use 8 or more character with a mix of letters, numbers and symbols
                        </FormDescription> */}
                <FormMessage />
                {/* {form.formState.errors.confirmPassword && (
                  <FormMessage>
                    {form.formState.errors.confirmPassword?.message}
                  </FormMessage>
                )} */}
              </FormItem>
            )}
          />
          {/* Show Password Checkbox */}
          <div className="flex items-center">
            <Checkbox
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
              onCheckedChange={(checked) => setShowPassword(!!checked)} // Update showPassword state based on checkbox
            />
            <label className="ml-2 text-sm">Show Password</label>
          </div>
          {/* after successful submission of the form the user should be sent to the login page */}
          <Button
            className="w-full bg-primary hover:text-primary hover:bg-secondary"
            type="submit"
          >
            Submit
          </Button>
          <div>
            <span className="flex items-center justify-center">
              Already have an account?
              <Link to="/login" className="ml-1 bg-transparent text-primary">
                Login
              </Link>
            </span>
          </div>
          <div className="mt-2 mb-2 flex items-center text-xs">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-1 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex w-full gap-0">
            <Button
              className="w-full bg-white text-accent-foreground hover:bg-primary hover:text-primary-foreground "
              type="button"
            >
              Sign Up with gmail
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
