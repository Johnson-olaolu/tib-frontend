"use client";
import FormPasswordInput from "@/components/form/FormPasswordInput";
import FormSubmit from "@/components/form/FormSubmit";
import FormTextInput from "@/components/form/FormTextInput";
import useToast from "@/context/toast";
import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import { setCredentials } from "@/store/authSlice";
import { saveUser } from "@/store/userSlice";
import { isObjectEmpty } from "@/utils/misc";
import { loginValidationSchema } from "@/utils/validation";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const { openToast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loginFormik = useFormik({
    initialValues: {
      emailOrUsername: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      authService
        .login(values)
        .then((data) => {
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
          userService.getUserDetails().then((data2) => {
            dispatch(
              saveUser({
                user: data2.data!,
              })
            );
            if (data2.data?.profile?.firstName || data2.data?.profile?.lastName) {
              router.push("/dashboard");
            } else {
              router.push("/onboarding/profile");
            }
          });
        })
        .catch((error) => {
          openToast({
            title: "Login Unsuccessful",
            text: error?.response?.data?.message,
            type: "failure",
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
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
          <Link className="text-sm font-bold text-tib-purple" href={"/auth/forgot-password"}>
            Forgot Password
          </Link>
        </div>
        <FormSubmit loading={isSubmitting} text="Login" disabled={!isObjectEmpty(loginFormik.errors) || isObjectEmpty(loginFormik.touched)} />
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
