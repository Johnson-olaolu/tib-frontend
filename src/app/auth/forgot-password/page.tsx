"use client";
import FormSubmit from "@/components/form/FormSubmit";
import FormTextInput from "@/components/form/FormTextInput";
import useToast from "@/context/toast";
import authService from "@/services/auth.service";
import { isObjectEmpty } from "@/utils/misc";
import { forgotPasswordSchema } from "@/utils/validation";
import { useFormik } from "formik";
import React, { useState } from "react";

const ForgotPassword = () => {
  const { openToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      authService
        .createForgetPasswordUrl(values.email)
        .then((data) => {
          openToast({
            title: "Email Sent",
            text: data.message,
            type: "success",
          });
        })
        .catch((error) => {
          openToast({
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
        <h2 className="text-2xl text-tib-purple font-bold">Reset Password</h2>
        <p className=" pr-10">Enter your email address so that we can help you recover your password</p>
      </div>
      <form onSubmit={forgotPasswordFormik.handleSubmit} className="mt-9 ">
        <div className="space-y-5 mb-7">
          <FormTextInput
            onChange={forgotPasswordFormik.handleChange}
            onBlur={forgotPasswordFormik.handleBlur}
            value={forgotPasswordFormik.values.email}
            placeholder="E.g emailneeded@gmail.com"
            name="email"
            label="Email"
            error={forgotPasswordFormik.errors.email && forgotPasswordFormik.touched.email ? forgotPasswordFormik.errors.email : undefined}
          />
        </div>
        <FormSubmit
          loading={isSubmitting}
          text="Submit"
          disabled={!isObjectEmpty(forgotPasswordFormik.errors) || isObjectEmpty(forgotPasswordFormik.touched)}
        />
      </form>
      {/* <p className=" text-center mt-7 text-sm">
        Don&apos;t have an account?{" "}
        <Link className="text-tib-purple" href={"/auth/sign-up"}>
          Register
        </Link>
      </p> */}
    </div>
  );
};

export default ForgotPassword;
