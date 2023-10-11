"use client";
import FormPasswordInput from "@/components/form/FormPasswordInput";
import FormSubmit from "@/components/form/FormSubmit";
import useToast from "@/context/toast";
import authService from "@/services/auth.service";
import { isObjectEmpty } from "@/utils/misc";
import { resetPasswordSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ResetPassword = () => {
  const searchParams = useSearchParams();

  const { openToast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const changePasswordFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      authService
        .resetPassword({
          password: values.password,
          email: searchParams.get("email") || "",
          token: searchParams.get("token") || "",
        })
        .then((data) => {
          openToast({
            title: "Password Changed Successfully",
            text: data.message,
            type: "success",
          });
          router.push("/auth/login");
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
        <h2 className="text-2xl text-tib-purple font-bold">Change Password</h2>
        <p className=" pr-10">Create a new password you can remember</p>
      </div>
      <form onSubmit={changePasswordFormik.handleSubmit} className="mt-9 ">
        <div className="space-y-5 mb-7">
          <FormPasswordInput
            onChange={changePasswordFormik.handleChange}
            onBlur={changePasswordFormik.handleBlur}
            value={changePasswordFormik.values.password}
            placeholder="E.g W1thy0U."
            name="password"
            label="Password"
            error={changePasswordFormik.errors.password && changePasswordFormik.touched.password ? changePasswordFormik.errors.password : undefined}
          />
          <FormPasswordInput
            onChange={changePasswordFormik.handleChange}
            onBlur={changePasswordFormik.handleBlur}
            value={changePasswordFormik.values.confirmPassword}
            placeholder="E.g W1thy0U."
            name="confirmPassword"
            label="Confirm Password"
            error={
              changePasswordFormik.errors.confirmPassword && changePasswordFormik.touched.confirmPassword
                ? changePasswordFormik.errors.confirmPassword
                : undefined
            }
          />
        </div>
        <FormSubmit
          loading={isSubmitting}
          text="Change Password"
          disabled={!isObjectEmpty(changePasswordFormik.errors) || isObjectEmpty(changePasswordFormik.touched)}
        />
      </form>
    </div>
  );
};

export default ResetPassword;
