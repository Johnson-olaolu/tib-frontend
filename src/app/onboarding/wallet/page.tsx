"use client";
import FormPasswordInput from "@/components/form/FormPasswordInput";
import useToast from "@/context/toast";
import { IPaymentMethod, ITransaction, IUser } from "@/services/types";
import { fundWalletValidationSchema } from "@/utils/validation";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import PaymentMethodBadge from "./components/PaymentMethodBadge";
import CardForm from "./components/CardForm";
import BankForm from "./components/BankForm";
import FormAmountInput from "@/components/form/FormAmountInput";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import useModal from "@/context/modal";
import walletService from "@/services/wallet.service";
import { io } from "socket.io-client";
import { useRouter } from "next13-progressbar";
import { formatAmount } from "@/utils/misc";
import userService from "@/services/user.service";

const Wallet = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openToast } = useToast();
  const { openModal, closeModal } = useModal();
  const transactionSocket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });
  const { data: paymentMethods } = useQuery({
    queryKey: ["paymentMethod"],
    queryFn: async () => {
      const res = await walletService.getPaymentMethods();
      return res.data;
    },
  });
  const walletQuery = useQuery({ queryKey: ["wallet"], queryFn: () => walletService.fetchUserWallet(user?.id || "") });

  const creditWalletMutation = useMutation({
    mutationFn: walletService.creditWallet,
    onSuccess: (data) => {
      openModal("confirm-transaction", data.data?.paystackTransactionUrl);
      if (data.data) {
        transactionSocket.on(data.data.id, (data: ITransaction) => {
          if (data.status === "success") {
            closeModal();
            openToast({
              title: "Transaction Successful",
              text: `₦${formatAmount(data.amount)} has been credited to your wallet`,
              type: "success",
            });
            queryClient.invalidateQueries({
              queryKey: ["wallet"],
            });
            router.push("/dashboard/home");
          } else {
            openToast({
              text: "Transaction Unsuccessful",
              type: "failure",
            });
          }
        });
      }
    },
    onError: (error: any) => {
      openToast({
        text: error?.response?.data?.message,
        type: "failure",
      });
    },
  });

  useEffect(() => {
    return () => {
      transactionSocket.disconnect();
    };
  }, []);

  const fundWalletFormik = useFormik({
    initialValues: {
      amount: {
        currency: "NGN",
        value: 0,
      },
      password: "",
      paymentMethod: "",
    },
    validationSchema: fundWalletValidationSchema,
    onSubmit: async (values) => {
      creditWalletMutation.mutate({
        walletId: walletQuery.data?.data?.id || "",
        body: values,
      });
    },
  });

  return (
    <div className=" pb-10">
      <h2 className=" text-tib-purple font-bold text-4xl text-center">Fund Wallet</h2>
      <div className="mt-28">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <FormAmountInput
            onChangeValue={(value) => {
              fundWalletFormik.setFieldValue("amount", { ...fundWalletFormik.values.amount, value });
            }}
            onBlur={fundWalletFormik.handleBlur}
            amount={fundWalletFormik.values.amount}
            placeholder="E.g 10,000"
            type="number"
            name="amount"
            label="Enter Amount"
            error={fundWalletFormik.errors.amount?.value && fundWalletFormik.touched.amount?.value ? fundWalletFormik.errors.amount.value : undefined}
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
              {paymentMethods?.map((p) => (
                <PaymentMethodBadge
                  paymentMethod={p}
                  active={fundWalletFormik.values.paymentMethod == p.name}
                  onClick={(name) => {
                    fundWalletFormik.setFieldValue("paymentMethod", name);
                    fundWalletFormik.submitForm();
                  }}
                  key={p.id}
                />
              ))}
            </div>
          </div>
          <div className="">
            {fundWalletFormik.values.paymentMethod === "Card" ? <CardForm /> : fundWalletFormik.values.paymentMethod === "Bank" ? <BankForm /> : null}
          </div>
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
