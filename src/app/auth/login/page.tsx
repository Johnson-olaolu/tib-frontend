"use client";
import FormPasswordInput from "@/components/form/FormPasswordInput";
import FormSubmit from "@/components/form/FormSubmit";
import FormTextInput from "@/components/form/FormTextInput";
import useToast from "@/context/toast";
import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import { setCredentials } from "@/store/authSlice";
import { isObjectEmpty } from "@/utils/misc";
import { loginValidationSchema } from "@/utils/validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next13-progressbar";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const { openToast } = useToast();
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      openToast({
        title: "Login Successful",
        text: data.message,
        type: "success",
      });
      dispatch(
        setCredentials({
          token: data!.data!.accessToken,
          user: data!.data!.user,
        })
      );
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      openToast({
        title: "Login Unsuccessful",
        text: error?.response?.data?.message,
        type: "failure",
      });
    },
  });

  const loginFormik = useFormik({
    initialValues: {
      emailOrUsername: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      loginMutation.mutate(values);
      const user = await queryClient.ensureQueryData({
        queryKey: ["user"],
        queryFn: async () => {
          const res = await userService.getUserDetails();
          return res.data;
        },
      });
      console.log(user);
      if (!user?.isEmailVerified) {
        router.push("/auth/verify-email");
      }
      if (user?.profile?.firstName || user?.profile?.lastName) {
        router.push("/dashboard/home");
      } else {
        router.push("/onboarding/profile");
      }
    },
  });
  return (
    <div className=" max-h-[712px] overflow-scroll">
      <div className="space-y-3">
        <h2 className="text-2xl text-tib-purple font-bold">Login</h2>
        <p className=" pr-10">Sign in to gain access to submit your new ideas</p>
      </div>
      <form onSubmit={loginFormik.handleSubmit} className="mt-9 ">
        <div className="space-y-5 mb-7">
          <FormTextInput
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.emailOrUsername}
            placeholder="E.g emailneeded@gmail.com"
            name="emailOrUsername"
            label="Email or Username"
            error={loginFormik.errors.emailOrUsername && loginFormik.touched.emailOrUsername ? loginFormik.errors.emailOrUsername : undefined}
          />
          <FormPasswordInput
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.password}
            placeholder="E.g W1thy0U."
            name="password"
            label="Password"
            error={loginFormik.errors.password && loginFormik.touched.password ? loginFormik.errors.password : undefined}
          />
          <Link className="text-sm font-bold text-tib-purple block" href={"/auth/forgot-password"}>
            Forgot Password
          </Link>
        </div>
        <FormSubmit
          loading={loginMutation.isPending}
          text="Login"
          disabled={!isObjectEmpty(loginFormik.errors) || isObjectEmpty(loginFormik.touched)}
        />
      </form>
      <p className=" text-center mt-7 text-sm">
        Don&apos;t have an account?{" "}
        <Link className="text-tib-purple" href={"/auth/sign-up"}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
