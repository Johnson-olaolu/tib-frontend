"use client";
import FormPasswordInput from "@/components/form/FormPasswordInput";
import FormTextInput from "@/components/form/FormTextInput";
import useToast from "@/context/toast";
import paymentMethodService from "@/services/payment-method.service";
import { IPaymentMethod } from "@/services/types";
import { fundWalletValidationSchema } from "@/utils/validation";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import PaymentMethodBadge from "./components/PaymentMethodBadge";
import { useRouter } from "next/navigation";
import CardForm from "./components/CardForm";
import BankForm from "./components/BankForm";

const Wallet = () => {
  const router = useRouter();
  const { openToast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
  const [activePaymentMethod, setActivePaymentMethod] = useState<string>();
  const [fundWalletData, setFundWalletData] = useState({
    amount: "",
    password: "",
  });
  const fundWalletFormik = useFormik({
    initialValues: {
      amount: 0,
      password: "",
    },
    validationSchema: fundWalletValidationSchema,
    onSubmit: async (values) => {
      // setIsSubmitting(true);
    },
  });

  useEffect(() => {
    paymentMethodService
      .getPaymentMethod()
      .then((data) => {
        data.data && setPaymentMethods(data.data);
      })
      .catch((error) => {
        openToast({
          text: error.response.data.messaage,
          type: "failure",
        });
      });
  }, []);

  return (
    <div className=" pb-10">
      <h2 className=" text-tib-purple font-bold text-4xl text-center">Fund Wallet</h2>
      <div className="mt-28">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <FormTextInput
            onChange={fundWalletFormik.handleChange}
            onBlur={fundWalletFormik.handleBlur}
            value={fundWalletFormik.values.amount == 0 ? undefined : fundWalletFormik.values.amount}
            placeholder="E.g kastroud"
            type="number"
            name="amount"
            label="Enter Amount"
            error={fundWalletFormik.errors.amount && fundWalletFormik.touched.amount ? fundWalletFormik.errors.amount : undefined}
          />
          <FormPasswordInput
            onChange={fundWalletFormik.handleChange}
            onBlur={fundWalletFormik.handleBlur}
            value={fundWalletFormik.values.password}
            placeholder="Enter Password"
            name="password"
            label="Password"
            error={fundWalletFormik.errors.password && fundWalletFormik.touched.password ? fundWalletFormik.errors.password : undefined}
          />
        </div>
        <div className="mt-14 ">
          <div className="mb-14">
            <p className=" text-xs">Choose Default Payment Method</p>
            <div className="grid grid-cols-4 gap-5 mt-2">
              {paymentMethods.map((p) => (
                <PaymentMethodBadge
                  paymentMethod={p}
                  active={activePaymentMethod == p.name}
                  onClick={(name) => {
                    setActivePaymentMethod(name);
                  }}
                  key={p.id}
                />
              ))}
            </div>
          </div>
          <div className="">{activePaymentMethod === "Card" ? <CardForm /> : activePaymentMethod === "Bank" ? <BankForm /> : null}</div>
          <div className=" flex justify-center mt-9">
            <button onClick={() => router.push("/dashboard/home")} className="text-sm text-tib-blue">
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
