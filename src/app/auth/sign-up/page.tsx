"use client";
import FormPasswordInput from "@/components/form/FormPasswordInput";
import FormSubmit from "@/components/form/FormSubmit";
import FormTextInput from "@/components/form/FormTextInput";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { signUpValidationSchema } from "../../../utils/validation";
import { isObjectEmpty } from "@/utils/misc";
import useToast from "@/context/toast";
import authService from "@/services/auth.service";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next13-progressbar";

const SignUp = () => {
  const dispatch = useDispatch();
  const { openToast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signUpMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (res) => {
      openToast({
        title: "Account Created",
        text: res.message,
        type: "success",
      });
      dispatch(
        setCredentials({
          token: res!.data!.accessToken,
          user: res!.data!.user,
        })
      );
      router.push("/auth/verify-email");
    },
    onError: (error: any) => {
      openToast({
        title: "Register Unsuccessful",
        text: error?.response?.data?.message,
        type: "failure",
      });
    },
  });
  const signUpFormik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      signUpMutation.mutate(values);
    },
  });

  return (
    <div className=" max-h-[712px] overflow-scroll">
      <div className="space-y-3">
        <h2 className="text-2xl text-tib-purple font-bold">Get Started</h2>
        <p className=" pr-10">Register to gain access to submit your new ideas</p>
      </div>
      <form onSubmit={signUpFormik.handleSubmit} className="mt-9 ">
        <div className="space-y-5 mb-7">
          <FormTextInput
            onChange={signUpFormik.handleChange}
            onBlur={signUpFormik.handleBlur}
            value={signUpFormik.values.userName}
            placeholder="E.g kastroud"
            name="userName"
            label="User Name"
            error={signUpFormik.errors.userName && signUpFormik.touched.userName ? signUpFormik.errors.userName : undefined}
          />
          <FormTextInput
            onChange={signUpFormik.handleChange}
            onBlur={signUpFormik.handleBlur}
            value={signUpFormik.values.email}
            type="email"
            placeholder="E.g emailneeded@gmail.com"
            name="email"
            label="Email"
            error={signUpFormik.errors.email && signUpFormik.touched.email ? signUpFormik.errors.email : undefined}
          />
          <FormPasswordInput
            onChange={signUpFormik.handleChange}
            onBlur={signUpFormik.handleBlur}
            value={signUpFormik.values.password}
            placeholder="E.g W1thy0U."
            name="password"
            label="Password"
            error={signUpFormik.errors.password && signUpFormik.touched.password ? signUpFormik.errors.password : undefined}
          />
          <FormPasswordInput
            onChange={signUpFormik.handleChange}
            onBlur={signUpFormik.handleBlur}
            value={signUpFormik.values.confirmPassword}
            placeholder="E.g W1thy0U."
            name="confirmPassword"
            label="Confirm Password"
            error={signUpFormik.errors.confirmPassword && signUpFormik.touched.confirmPassword ? signUpFormik.errors.confirmPassword : undefined}
          />
        </div>
        <FormSubmit
          loading={signUpMutation.isPending}
          text="Sign Up"
          disabled={!isObjectEmpty(signUpFormik.errors) || isObjectEmpty(signUpFormik.touched)}
        />
      </form>
      <p className=" text-center mt-7 text-sm">
        Already have an account?{" "}
        <Link className="text-tib-purple" href={"/auth/login"}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
